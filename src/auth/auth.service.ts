// src/auth/auth.service.ts

import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CompaniesService } from '../companies/companies.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';

import { RegisterCompanyDto } from './dto/register-company.dto';
import { LoginCompanyDto } from './dto/login-company.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';

import { RefreshToken } from './refresh-token.entity';
import { PasswordResetToken } from './password-reset.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly jwtService: JwtService,

    @InjectRepository(RefreshToken)
    private readonly rtRepo: Repository<RefreshToken>,

    @InjectRepository(PasswordResetToken)
    private readonly prtRepo: Repository<PasswordResetToken>,
  ) {}

  /**
   * Genera un accessToken y un refreshToken plano,
   * guarda el refresh token hasheado en BD
   */
  private async generateTokens(
    companyId: number,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = { sub: companyId, email };

    // Generar access token
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    });

    // Generar refresh token plano (URL-safe Base64)
    const plainRefresh = randomBytes(48).toString('base64url');
    const hashRefresh = await bcrypt.hash(plainRefresh, 10);
    const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000); // +7 días

    // Guardar el hash en BD
    await this.rtRepo.save(
      this.rtRepo.create({
        tokenHash: hashRefresh,
        expiresAt,
        company: { id: companyId } as any,
      }),
    );

    return {
      accessToken,
      refreshToken: plainRefresh,
    };
  }

  /** Registro de empresa + tokens */
  async register(dto: RegisterCompanyDto) {
    const exists = await this.companiesService.findByEmail(dto.email);
    if (exists) {
      throw new BadRequestException('Empresa ya registrada');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const company = await this.companiesService.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
    });

    return this.generateTokens(company.id, company.email);
  }

  /** Login de empresa + tokens */
  async login(dto: LoginCompanyDto) {
    const company = await this.companiesService.findByEmail(dto.email);
    if (!company) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const valid = await bcrypt.compare(dto.password, company.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.generateTokens(company.id, company.email);
  }

  /** Renueva access & refresh tokens */
  async refresh(dto: RefreshTokenDto) {
    const now = new Date();
    const validTokens = await this.rtRepo.find({
      where: { expiresAt: MoreThan(now) },
      relations: ['company'],
    });

    for (const rec of validTokens) {
      if (await bcrypt.compare(dto.refreshToken, rec.tokenHash)) {
        const company = rec.company;
        // Invalida el token usado
        await this.rtRepo.delete(rec.id);
        // Genera nuevos tokens
        return this.generateTokens(company.id, company.email);
      }
    }

    throw new UnauthorizedException('Refresh token inválido');
  }

  /** Genera un código de reinicio, lo devuelve y lo guarda hasheado */
  async requestPasswordReset(dto: ResetPasswordDto) {
    const company = await this.companiesService.findByEmail(dto.email);
    if (!company) {
      throw new BadRequestException('Email no registrado');
    }

    const rawToken = randomBytes(16).toString('hex'); // 32 hex chars
    const tokenHash = await bcrypt.hash(rawToken, 10);
    const expiresAt = new Date(Date.now() + 3600 * 1000); // +1 hora

    await this.prtRepo.save(
      this.prtRepo.create({
        tokenHash,
        expiresAt,
        company,
      }),
    );

    // En desarrollo devolvemos el token para Postman
    return { resetToken: rawToken, expiresAt };
  }

  /** Valida el token de reinicio y actualiza la contraseña */
  async resetPassword(dto: ResetPasswordConfirmDto) {
    const now = new Date();
    const candidates = await this.prtRepo.find({
      where: { expiresAt: MoreThan(now) },
      relations: ['company'],
    });

    for (const rec of candidates) {
      if (await bcrypt.compare(dto.token, rec.tokenHash)) {
        // Actualiza el hash de la contraseña
        const newHash = await bcrypt.hash(dto.newPassword, 10);
        await this.companiesService.update(rec.company.id, {
          passwordHash: newHash,
        });
        // Elimina el token usado
        await this.prtRepo.delete(rec.id);
        // Retorna mensaje claro
        return { message: 'Contraseña actualizada' };
      }
    }

    throw new BadRequestException('Token inválido o expirado');
  }
}