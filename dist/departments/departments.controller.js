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
exports.DepartmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const get_company_decorator_1 = require("../common/decorators/get-company.decorator");
const departments_service_1 = require("./departments.service");
const create_department_dto_1 = require("./dto/create-department.dto");
const update_department_dto_1 = require("./dto/update-department.dto");
const department_entity_1 = require("./department.entity");
let DepartmentsController = class DepartmentsController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    findAll(companyId) {
        return this.svc.findAll(companyId);
    }
    create(companyId, dto) {
        return this.svc.create(companyId, dto);
    }
    update(companyId, id, dto) {
        return this.svc.update(companyId, id, dto);
    }
    remove(companyId, id) {
        return this.svc.remove(companyId, id);
    }
};
exports.DepartmentsController = DepartmentsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar departamentos de la empresa' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de departamentos.', type: [department_entity_1.Department] }),
    (0, common_1.Get)(),
    __param(0, (0, get_company_decorator_1.GetCompany)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo departamento' }),
    (0, swagger_1.ApiBody)({ type: create_department_dto_1.CreateDepartmentDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Departamento creado.', type: department_entity_1.Department }),
    (0, common_1.Post)(),
    __param(0, (0, get_company_decorator_1.GetCompany)('companyId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar nombre y descripción de un departamento' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del departamento' }),
    (0, swagger_1.ApiBody)({ type: update_department_dto_1.UpdateDepartmentDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Departamento actualizado.', type: department_entity_1.Department }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, get_company_decorator_1.GetCompany)('companyId')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un departamento' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del departamento' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Departamento eliminado.' }),
    (0, common_1.HttpCode)(204),
    (0, common_1.Delete)(':id'),
    __param(0, (0, get_company_decorator_1.GetCompany)('companyId')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "remove", null);
exports.DepartmentsController = DepartmentsController = __decorate([
    (0, swagger_1.ApiTags)('departments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('departments'),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsController);
//# sourceMappingURL=departments.controller.js.map