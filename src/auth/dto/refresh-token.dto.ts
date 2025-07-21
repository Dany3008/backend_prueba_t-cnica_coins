// src/auth/dto/refresh-token.dto.ts

import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh JWT token para renovar access token' })
  @IsString()
  refreshToken: string;
}