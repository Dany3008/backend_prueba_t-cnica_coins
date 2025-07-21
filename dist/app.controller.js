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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const companies_service_1 = require("./companies/companies.service");
let AppController = class AppController {
    companiesService;
    constructor(companiesService) {
        this.companiesService = companiesService;
    }
    async allCompanies() {
        return this.companiesService.findAll();
    }
    async testCompanyConnection() {
        try {
            const email = 'test@empresa.com';
            const company = await this.companiesService.findByEmail(email);
            if (!company) {
                throw new common_1.HttpException('Empresa no encontrada', common_1.HttpStatus.NOT_FOUND);
            }
            return { status: 'OK', data: company };
        }
        catch (error) {
            throw new common_1.HttpException(`Error en CompaniesService: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('all-companies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "allCompanies", null);
__decorate([
    (0, common_1.Get)('test-company'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testCompanyConnection", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService])
], AppController);
//# sourceMappingURL=app.controller.js.map