import { CompaniesService } from '../companies/companies.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { LoginCompanyDto } from './dto/login-company.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import { RefreshToken } from './refresh-token.entity';
import { PasswordResetToken } from './password-reset.entity';
export declare class AuthService {
    private readonly companiesService;
    private readonly jwtService;
    private readonly rtRepo;
    private readonly prtRepo;
    constructor(companiesService: CompaniesService, jwtService: JwtService, rtRepo: Repository<RefreshToken>, prtRepo: Repository<PasswordResetToken>);
    private generateTokens;
    register(dto: RegisterCompanyDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(dto: LoginCompanyDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(dto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    requestPasswordReset(dto: ResetPasswordDto): Promise<{
        resetToken: string;
        expiresAt: Date;
    }>;
    resetPassword(dto: ResetPasswordConfirmDto): Promise<{
        message: string;
    }>;
}
