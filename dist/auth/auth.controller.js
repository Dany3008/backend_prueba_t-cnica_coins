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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const register_company_dto_1 = require("./dto/register-company.dto");
const login_company_dto_1 = require("./dto/login-company.dto");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const reset_password_confirm_dto_1 = require("./dto/reset-password-confirm.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto) {
        return this.authService.register(dto);
    }
    async login(dto) {
        return this.authService.login(dto);
    }
    async refresh(dto) {
        return this.authService.refresh(dto);
    }
    async requestPasswordReset(dto) {
        return this.authService.requestPasswordReset(dto);
    }
    async confirmPasswordReset(dto) {
        return this.authService.resetPassword(dto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Registro de nueva empresa' }),
    (0, swagger_1.ApiBody)({ type: register_company_dto_1.RegisterCompanyDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Empresa registrada y tokens devueltos.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos o email ya existe.' }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_company_dto_1.RegisterCompanyDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60 } }),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Login de empresa' }),
    (0, swagger_1.ApiBody)({ type: login_company_dto_1.LoginCompanyDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Autenticación exitosa con tokens.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credenciales inválidas.' }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_company_dto_1.LoginCompanyDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Renovar tokens JWT (refresh)' }),
    (0, swagger_1.ApiBody)({ type: refresh_token_dto_1.RefreshTokenDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Nuevos access + refresh tokens.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Refresh token inválido.' }),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Solicitar reinicio de contraseña' }),
    (0, swagger_1.ApiBody)({ type: reset_password_dto_1.ResetPasswordDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token de reinicio generado.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Email no registrado.' }),
    (0, common_1.Post)('resetPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordReset", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Confirmar reinicio de contraseña' }),
    (0, swagger_1.ApiBody)({ type: reset_password_confirm_dto_1.ResetPasswordConfirmDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contraseña actualizada correctamente.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Token inválido o expirado.' }),
    (0, common_1.Post)('resetPassword/confirm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_confirm_dto_1.ResetPasswordConfirmDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmPasswordReset", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map