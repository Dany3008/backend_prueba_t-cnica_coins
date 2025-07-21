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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const get_company_decorator_1 = require("../common/decorators/get-company.decorator");
const reports_service_1 = require("./reports.service");
const summary_report_dto_1 = require("./dto/summary-report.dto");
const date_range_dto_1 = require("./dto/date-range.dto");
const employee_entity_1 = require("../employees/employee.entity");
let ReportsController = class ReportsController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    summary(companyId) {
        return this.svc.getSummary(companyId);
    }
    employeesByDate(companyId, range) {
        return this.svc.getEmployeesByDate(companyId, range);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Resumen de la empresa' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: summary_report_dto_1.SummaryReportDto }),
    __param(0, (0, get_company_decorator_1.GetCompany)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "summary", null);
__decorate([
    (0, common_1.Get)('employees-by-date'),
    (0, swagger_1.ApiOperation)({ summary: 'Empleados por rango de fechas de contratación' }),
    (0, swagger_1.ApiQuery)({ name: 'hiredFrom', required: true, description: 'Fecha de inicio (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'hiredTo', required: true, description: 'Fecha de fin (YYYY-MM-DD)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [employee_entity_1.Employee] }),
    __param(0, (0, get_company_decorator_1.GetCompany)('companyId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, date_range_dto_1.DateRangeDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "employeesByDate", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('reports'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map