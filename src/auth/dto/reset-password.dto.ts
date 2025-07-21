// src/auth/dto/reset-password.dto.ts

import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Email de la empresa registrada' })
  @IsEmail()
  email: string;
}