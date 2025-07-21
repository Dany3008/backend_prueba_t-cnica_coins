"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const companies_service_1 = require("../companies/companies.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const crypto_1 = require("crypto");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const refresh_token_entity_1 = require("./refresh-token.entity");
const password_reset_entity_1 = require("./password-reset.entity");
let AuthService = class AuthService {
    companiesService;
    jwtService;
    rtRepo;
    prtRepo;
    constructor(companiesService, jwtService, rtRepo, prtRepo) {
        this.companiesService = companiesService;
        this.jwtService = jwtService;
        this.rtRepo = rtRepo;
        this.prtRepo = prtRepo;
    }
    async generateTokens(companyId, email) {
        const payload = { sub: companyId, email };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
        });
        const plainRefresh = (0, crypto_1.randomBytes)(48).toString('base64url');
        const hashRefresh = await bcrypt.hash(plainRefresh, 10);
        const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
        await this.rtRepo.save(this.rtRepo.create({
            tokenHash: hashRefresh,
            expiresAt,
            company: { id: companyId },
        }));
        return {
            accessToken,
            refreshToken: plainRefresh,
        };
    }
    async register(dto) {
        const exists = await this.companiesService.findByEmail(dto.email);
        if (exists) {
            throw new common_1.BadRequestException('Empresa ya registrada');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const company = await this.companiesService.create({
            name: dto.name,
            email: dto.email,
            passwordHash,
        });
        return this.generateTokens(company.id, company.email);
    }
    async login(dto) {
        const company = await this.companiesService.findByEmail(dto.email);
        if (!company) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const valid = await bcrypt.compare(dto.password, company.passwordHash);
        if (!valid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        return this.generateTokens(company.id, company.email);
    }
    async refresh(dto) {
        const now = new Date();
        const validTokens = await this.rtRepo.find({
            where: { expiresAt: (0, typeorm_2.MoreThan)(now) },
            relations: ['company'],
        });
        for (const rec of validTokens) {
            if (await bcrypt.compare(dto.refreshToken, rec.tokenHash)) {
                const company = rec.company;
                await this.rtRepo.delete(rec.id);
                return this.generateTokens(company.id, company.email);
            }
        }
        throw new common_1.UnauthorizedException('Refresh token inválido');
    }
    async requestPasswordReset(dto) {
        const company = await this.companiesService.findByEmail(dto.email);
        if (!company) {
            throw new common_1.BadRequestException('Email no registrado');
        }
        const rawToken = (0, crypto_1.randomBytes)(16).toString('hex');
        const tokenHash = await bcrypt.hash(rawToken, 10);
        const expiresAt = new Date(Date.now() + 3600 * 1000);
        await this.prtRepo.save(this.prtRepo.create({
            tokenHash,
            expiresAt,
            company,
        }));
        return { resetToken: rawToken, expiresAt };
    }
    async resetPassword(dto) {
        const now = new Date();
        const candidates = await this.prtRepo.find({
            where: { expiresAt: (0, typeorm_2.MoreThan)(now) },
            relations: ['company'],
        });
        for (const rec of candidates) {
            if (await bcrypt.compare(dto.token, rec.tokenHash)) {
                const newHash = await bcrypt.hash(dto.newPassword, 10);
                await this.companiesService.update(rec.company.id, {
                    passwordHash: newHash,
                });
                await this.prtRepo.delete(rec.id);
                return { message: 'Contraseña actualizada' };
            }
        }
        throw new common_1.BadRequestException('Token inválido o expirado');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __param(3, (0, typeorm_1.InjectRepository)(password_reset_entity_1.PasswordResetToken)),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService,
        jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map