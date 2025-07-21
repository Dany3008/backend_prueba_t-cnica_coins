"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const config_module_1 = require("./config/config.module");
const app_controller_1 = require("./app.controller");
const companies_module_1 = require("./companies/companies.module");
const auth_module_1 = require("./auth/auth.module");
const departments_module_1 = require("./departments/departments.module");
const employees_module_1 = require("./employees/employees.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.AppConfigModule,
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'default',
                    ttl: 60000,
                    limit: 10,
                },
            ]),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_module_1.AppConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'mysql',
                    host: config.get('database.host'),
                    port: config.get('database.port'),
                    username: config.get('database.username'),
                    password: config.get('database.password'),
                    database: config.get('database.database'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: true,
                    logger: 'advanced-console',
                    logging: ['error'],
                }),
            }),
            companies_module_1.CompaniesModule,
            auth_module_1.AuthModule,
            departments_module_1.DepartmentsModule,
            employees_module_1.EmployeesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map