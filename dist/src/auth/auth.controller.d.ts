import { AuthService } from './auth.service';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { LoginCompanyDto } from './dto/login-company.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    confirmPasswordReset(dto: ResetPasswordConfirmDto): Promise<{
        message: string;
    }>;
}
