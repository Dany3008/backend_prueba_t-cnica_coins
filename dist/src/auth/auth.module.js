"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_strategy_1 = require("../common/strategies/jwt.strategy");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const companies_module_1 = require("../companies/companies.module");
const company_entity_1 = require("../companies/company.entity");
const refresh_token_entity_1 = require("./refresh-token.entity");
const password_reset_entity_1 = require("./password-reset.entity");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            companies_module_1.CompaniesModule,
            typeorm_1.TypeOrmModule.forFeature([company_entity_1.Company, refresh_token_entity_1.RefreshToken, password_reset_entity_1.PasswordResetToken]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (cfg) => ({
                    secret: cfg.get('JWT_ACCESS_TOKEN_SECRET'),
                    signOptions: {
                        expiresIn: cfg.get('JWT_ACCESS_TOKEN_EXPIRY'),
                    },
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            jwt_auth_guard_1.JwtAuthGuard,
        ],
        exports: [
            auth_service_1.AuthService,
            jwt_auth_guard_1.JwtAuthGuard,
            passport_1.PassportModule,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map