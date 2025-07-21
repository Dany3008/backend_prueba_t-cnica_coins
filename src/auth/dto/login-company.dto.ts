// src/auth/dto/login-company.dto.ts
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginCompanyDto {
  @ApiProperty({ description: 'Email registrado' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña' })
  @IsString()
  password: string;
}