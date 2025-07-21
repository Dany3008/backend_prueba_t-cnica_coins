// src/auth/dto/register-company.dto.ts
import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterCompanyDto {
  @ApiProperty({ description: 'Nombre de la empresa' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email de la empresa', example: 'demo@empresa.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6)
  password: string;
}