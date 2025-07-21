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
exports.EmployeeDeptHistoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const get_company_decorator_1 = require("../common/decorators/get-company.decorator");
const employee_dept_history_service_1 = require("./employee-dept-history.service");
const assign_department_dto_1 = require("./dto/assign-department.dto");
let EmployeeDeptHistoryController = class EmployeeDeptHistoryController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    assign(user, dto) {
        return this.svc.assign(user.companyId, dto);
    }
    release(id, hasta) {
        return this.svc.release(+id, hasta);
    }
    history(user) {
        return this.svc.history(user.companyId);
    }
};
exports.EmployeeDeptHistoryController = EmployeeDeptHistoryController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Registrar inicio de asignación de departamento' }),
    (0, swagger_1.ApiBody)({ type: assign_department_dto_1.AssignDepartmentDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Asignación registrada.' }),
    (0, common_1.Post)('assign'),
    __param(0, (0, get_company_decorator_1.GetCompany)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, assign_department_dto_1.AssignDepartmentDto]),
    __metadata("design:returntype", void 0)
], EmployeeDeptHistoryController.prototype, "assign", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Registrar fin de asignación de departamento' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID de historial' }),
    (0, swagger_1.ApiBody)({ schema: { properties: { hasta: { type: 'string', format: 'date' } } } }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Asignación finalizada.' }),
    (0, common_1.Patch)('release/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('hasta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], EmployeeDeptHistoryController.prototype, "release", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar historial de asignaciones' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historial obtenido.' }),
    (0, common_1.Get)(),
    __param(0, (0, get_company_decorator_1.GetCompany)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EmployeeDeptHistoryController.prototype, "history", null);
exports.EmployeeDeptHistoryController = EmployeeDeptHistoryController = __decorate([
    (0, swagger_1.ApiTags)('dept-history'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('dept-history'),
    __metadata("design:paramtypes", [employee_dept_history_service_1.EmployeeDeptHistoryService])
], EmployeeDeptHistoryController);
//# sourceMappingURL=employee-dept-history.controller.js.map