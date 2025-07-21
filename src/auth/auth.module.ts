// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule }   from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService }    from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy }    from '../common/strategies/jwt.strategy';
import { JwtAuthGuard }   from '../common/guards/jwt-auth.guard';  

import { CompaniesModule } from '../companies/companies.module';
import { Company }         from '../companies/company.entity';
import { RefreshToken }    from './refresh-token.entity';
import { PasswordResetToken } from './password-reset.entity';

@Module({
  imports: [
    ConfigModule,
    CompaniesModule,
    TypeOrmModule.forFeature([Company, RefreshToken, PasswordResetToken]),

    // Passport configurado para usar "jwt" por defecto
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // JwtModule alimentado por ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: cfg.get<string>('JWT_ACCESS_TOKEN_EXPIRY'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,    
  ],
  exports: [
    AuthService,
    JwtAuthGuard,    
    PassportModule,
  ],
})
export class AuthModule {}