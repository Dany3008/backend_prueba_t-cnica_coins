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
exports.Department = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("../companies/company.entity");
const employee_entity_1 = require("../employees/employee.entity");
const employee_dept_history_entity_1 = require("../dept-history/employee-dept-history.entity");
let Department = class Department {
    id;
    nombre;
    descripcion;
    company;
    empresa_Id;
    createdAt;
    updatedAt;
    deletedAt;
    empleados;
    historial;
};
exports.Department = Department;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'depto_id' }),
    __metadata("design:type", Number)
], Department.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre' }),
    __metadata("design:type", String)
], Department.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Department.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (c) => c.departamentos, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresa_id' }),
    __metadata("design:type", company_entity_1.Company)
], Department.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.RelationId)((d) => d.company),
    __metadata("design:type", Number)
], Department.prototype, "empresa_Id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Department.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Department.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Object)
], Department.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.Employee, (e) => e.department),
    __metadata("design:type", Array)
], Department.prototype, "empleados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_dept_history_entity_1.EmployeeDeptHistory, (h) => h.department),
    __metadata("design:type", Array)
], Department.prototype, "historial", void 0);
exports.Department = Department = __decorate([
    (0, typeorm_1.Entity)({ name: 'departamentos' })
], Department);
//# sourceMappingURL=department.entity.js.map