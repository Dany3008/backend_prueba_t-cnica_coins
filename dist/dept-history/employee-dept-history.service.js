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
exports.EmployeeDeptHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_dept_history_entity_1 = require("./employee-dept-history.entity");
const employee_entity_1 = require("../employees/employee.entity");
const department_entity_1 = require("../departments/department.entity");
let EmployeeDeptHistoryService = class EmployeeDeptHistoryService {
    historyRepo;
    employeeRepo;
    departmentRepo;
    constructor(historyRepo, employeeRepo, departmentRepo) {
        this.historyRepo = historyRepo;
        this.employeeRepo = employeeRepo;
        this.departmentRepo = departmentRepo;
    }
    async assign(companyId, dto) {
        const employee = await this.employeeRepo.findOne({
            where: { id: dto.employeeId, empresaId: companyId },
        });
        if (!employee) {
            throw new common_1.BadRequestException(`Empleado ${dto.employeeId} no encontrado`);
        }
        const dept = await this.departmentRepo.findOne({
            where: { id: employee.deptoId, empresa_Id: companyId },
        });
        if (!dept) {
            throw new common_1.BadRequestException(`Departamento ${employee.deptoId} no encontrado`);
        }
        const hist = this.historyRepo.create({
            empleadoId: dto.employeeId,
            deptoId: employee.deptoId,
            desde: dto.desde,
        });
        return this.historyRepo.save(hist);
    }
    async release(id, hasta) {
        const hist = await this.historyRepo.findOne({ where: { id } });
        if (!hist) {
            throw new common_1.NotFoundException(`Historial ${id} no encontrado`);
        }
        hist.hasta = hasta;
        return this.historyRepo.save(hist);
    }
    async history(companyId) {
        return this.historyRepo.find({
            relations: ['employee', 'department'],
            where: {
                employee: { empresaId: companyId },
            },
        });
    }
};
exports.EmployeeDeptHistoryService = EmployeeDeptHistoryService;
exports.EmployeeDeptHistoryService = EmployeeDeptHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_dept_history_entity_1.EmployeeDeptHistory)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(2, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EmployeeDeptHistoryService);
//# sourceMappingURL=employee-dept-history.service.js.map