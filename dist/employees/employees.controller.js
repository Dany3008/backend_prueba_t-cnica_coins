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
exports.EmployeesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const get_company_decorator_1 = require("../common/decorators/get-company.decorator");
const employees_service_1 = require("./employees.service");
const create_employee_dto_1 = require("./dto/create-employee.dto");
const update_employee_dto_1 = require("./dto/update-employee.dto");
const filter_employees_dto_1 = require("./dto/filter-employees.dto");
let EmployeesController = class EmployeesController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    findAll(user, filters) {
        return this.svc.findAll(user.companyId, filters);
    }
    create(user, dto) {
        return this.svc.create(user.companyId, dto);
    }
    findOne(user, id) {
        return this.svc.findOne(user.companyId, id);
    }
    update(user, id, dto) {
        return this.svc.update(user.companyId, id, dto);
    }
    remove(user, id) {
        return this.svc.remove(user.companyId, id);
    }
};
exports.EmployeesController = EmployeesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar empleados con filtros y paginación' }),
    (0, swagger_1.ApiQuery)({ name: 'deptoId', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'estado', required: false, enum: ['activo', 'inactivo'] }),
    (0, swagger_1.ApiQuery)({ name: 'fechaDesde', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'fechaHasta', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de empleados.' }),
    (0, common_1.Get)(),
    __param(0, (0, get_company_decorator_1.GetCompany)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, filter_employees_dto_1.FilterEmployeesDto]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo empleado' }),
    (0, swagger_1.ApiBody)({ type: create_employee_dto_1.CreateEmployeeDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Empleado creado.' }),
    (0, common_1.Post)(),
    __param(0, (0, get_company_decorator_1.GetCompany)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un empleado por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del empleado' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Empleado encontrado.' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, get_company_decorator_1.GetCompany)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un empleado' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del empleado' }),
    (0, swagger_1.ApiBody)({ type: update_employee_dto_1.UpdateEmployeeDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Empleado actualizado.' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, get_company_decorator_1.GetCompany)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_employee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un empleado' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del empleado' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Empleado eliminado.' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, get_company_decorator_1.GetCompany)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], EmployeesController.prototype, "remove", null);
exports.EmployeesController = EmployeesController = __decorate([
    (0, swagger_1.ApiTags)('employees'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService])
], EmployeesController);
//# sourceMappingURL=employees.controller.js.map