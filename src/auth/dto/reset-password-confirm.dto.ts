// src/auth/dto/reset-password-confirm.dto.ts

import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordConfirmDto {
  @ApiProperty({ description: 'Token de reinicio de contraseña recibido' })
  @IsString()
  token: string;

  @ApiProperty({ description: 'Nueva contraseña (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}