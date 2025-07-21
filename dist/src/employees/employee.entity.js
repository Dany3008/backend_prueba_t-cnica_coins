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
exports.Employee = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("../companies/company.entity");
const department_entity_1 = require("../departments/department.entity");
const employee_dept_history_entity_1 = require("../dept-history/employee-dept-history.entity");
let Employee = class Employee {
    id;
    empresaId;
    deptoId;
    nombre;
    apellido;
    email;
    estado;
    fechaContratacion;
    createdAt;
    updatedAt;
    deletedAt;
    company;
    department;
    historial;
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'empleado_id' }),
    __metadata("design:type", Number)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'empresa_id' }),
    __metadata("design:type", Number)
], Employee.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'depto_id' }),
    __metadata("design:type", Number)
], Employee.prototype, "deptoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre' }),
    __metadata("design:type", String)
], Employee.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apellido' }),
    __metadata("design:type", String)
], Employee.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email' }),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'estado',
        type: 'enum',
        enum: ['activo', 'inactivo'],
        default: 'activo',
    }),
    __metadata("design:type", String)
], Employee.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_contratacion', type: 'date' }),
    __metadata("design:type", String)
], Employee.prototype, "fechaContratacion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Employee.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Employee.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Object)
], Employee.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (c) => c.empleados, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresa_id' }),
    __metadata("design:type", company_entity_1.Company)
], Employee.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (d) => d.empleados, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'depto_id' }),
    __metadata("design:type", department_entity_1.Department)
], Employee.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_dept_history_entity_1.EmployeeDeptHistory, (h) => h.employee),
    __metadata("design:type", Array)
], Employee.prototype, "historial", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)({ name: 'empleados' })
], Employee);
//# sourceMappingURL=employee.entity.js.map