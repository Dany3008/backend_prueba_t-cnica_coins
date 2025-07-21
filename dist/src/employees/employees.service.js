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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const employee_entity_1 = require("./employee.entity");
let EmployeesService = class EmployeesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(empresaId, dto) {
        const emp = this.repo.create({ ...dto, empresaId });
        return this.repo.save(emp);
    }
    async findOne(empresaId, id) {
        const emp = await this.repo.findOne({
            where: { empresaId, id },
            relations: ['department'],
        });
        if (!emp) {
            throw new common_1.NotFoundException(`Empleado ${id} no encontrado`);
        }
        return emp;
    }
    async update(empresaId, id, dto) {
        await this.repo.update({ empresaId, id }, dto);
        return this.findOne(empresaId, id);
    }
    remove(empresaId, id) {
        return this.repo.softDelete({ empresaId, id });
    }
    async findAll(companyId, filters) {
        const qb = this.repo
            .createQueryBuilder('e')
            .where('e.empresaId = :companyId', { companyId });
        if (filters.deptoId) {
            qb.andWhere('e.deptoId = :deptoId', { deptoId: filters.deptoId });
        }
        if (filters.estado) {
            qb.andWhere('e.estado = :estado', { estado: filters.estado });
        }
        if (filters.fechaDesde) {
            qb.andWhere('e.fechaContratacion >= :desde', { desde: filters.fechaDesde });
        }
        if (filters.fechaHasta) {
            qb.andWhere('e.fechaContratacion <= :hasta', { hasta: filters.fechaHasta });
        }
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        qb.skip((page - 1) * limit).take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map