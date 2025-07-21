// src/auth/auth.controller.ts

import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ThrottlerGuard,
  Throttle,
} from '@nestjs/throttler';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { LoginCompanyDto } from './dto/login-company.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registro de nueva empresa' })
  @ApiBody({ type: RegisterCompanyDto })
  @ApiResponse({ status: 201, description: 'Empresa registrada y tokens devueltos.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o email ya existe.' })
  @Post('register')
  async register(@Body() dto: RegisterCompanyDto) {
    return this.authService.register(dto);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60 } })  // 5 peticiones cada 60 segundos por IP
  @HttpCode(200)
  @ApiOperation({ summary: 'Login de empresa' })
  @ApiBody({ type: LoginCompanyDto })
  @ApiResponse({ status: 200, description: 'Autenticación exitosa con tokens.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  @Post('login')
  async login(@Body() dto: LoginCompanyDto) {
    return this.authService.login(dto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Renovar tokens JWT (refresh)' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, description: 'Nuevos access + refresh tokens.' })
  @ApiResponse({ status: 401, description: 'Refresh token inválido.' })
  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Solicitar reinicio de contraseña' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Token de reinicio generado.' })
  @ApiResponse({ status: 400, description: 'Email no registrado.' })
  @Post('resetPassword')
  async requestPasswordReset(@Body() dto: ResetPasswordDto) {
    return this.authService.requestPasswordReset(dto);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Confirmar reinicio de contraseña' })
  @ApiBody({ type: ResetPasswordConfirmDto })
  @ApiResponse({ status: 200, description: 'Contraseña actualizada correctamente.' })
  @ApiResponse({ status: 400, description: 'Token inválido o expirado.' })
  @Post('resetPassword/confirm')
  async confirmPasswordReset(@Body() dto: ResetPasswordConfirmDto) {
    return this.authService.resetPassword(dto);
  }
}