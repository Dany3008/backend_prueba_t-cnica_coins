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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_entity_1 = require("../departments/department.entity");
const employee_entity_1 = require("../employees/employee.entity");
let ReportsService = class ReportsService {
    deptRepo;
    empRepo;
    constructor(deptRepo, empRepo) {
        this.deptRepo = deptRepo;
        this.empRepo = empRepo;
    }
    async getSummary(companyId) {
        const [{ count: totalDepartments }] = await this.deptRepo
            .createQueryBuilder('d')
            .where('d.empresa_id = :companyId', { companyId })
            .select('COUNT(d.depto_id)', 'count')
            .getRawMany();
        const [{ count: totalEmployees }] = await this.empRepo
            .createQueryBuilder('e')
            .where('e.empresa_id = :companyId', { companyId })
            .select('COUNT(e.empleado_id)', 'count')
            .getRawMany();
        const [{ count: activeEmployees }] = await this.empRepo
            .createQueryBuilder('e')
            .where('e.empresa_id = :companyId', { companyId })
            .andWhere('e.estado = :status', { status: 'ACTIVO' })
            .select('COUNT(e.empleado_id)', 'count')
            .getRawMany();
        return {
            totalDepartments: +totalDepartments,
            totalEmployees: +totalEmployees,
            activeEmployees: +activeEmployees,
            inactiveEmployees: +totalEmployees - +activeEmployees,
        };
    }
    async getEmployeesByDate(companyId, range) {
        return this.empRepo
            .createQueryBuilder('e')
            .where('e.empresa_id = :companyId', { companyId })
            .andWhere('e.fecha_contratacion BETWEEN :from AND :to', {
            from: range.hiredFrom,
            to: range.hiredTo,
        })
            .orderBy('e.fecha_contratacion', 'ASC')
            .getMany();
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsService);
//# sourceMappingURL=reports.service.js.map