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
exports.EmployeeDeptHistory = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("../employees/employee.entity");
const department_entity_1 = require("../departments/department.entity");
let EmployeeDeptHistory = class EmployeeDeptHistory {
    id;
    empleadoId;
    deptoId;
    desde;
    hasta;
    employee;
    department;
};
exports.EmployeeDeptHistory = EmployeeDeptHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'historial_id' }),
    __metadata("design:type", Number)
], EmployeeDeptHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'empleado_id' }),
    __metadata("design:type", Number)
], EmployeeDeptHistory.prototype, "empleadoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'depto_id' }),
    __metadata("design:type", Number)
], EmployeeDeptHistory.prototype, "deptoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'desde', type: 'date' }),
    __metadata("design:type", String)
], EmployeeDeptHistory.prototype, "desde", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hasta', type: 'date', nullable: true }),
    __metadata("design:type", String)
], EmployeeDeptHistory.prototype, "hasta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (e) => e.historial, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleado_id' }),
    __metadata("design:type", employee_entity_1.Employee)
], EmployeeDeptHistory.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (d) => d.historial, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'depto_id' }),
    __metadata("design:type", department_entity_1.Department)
], EmployeeDeptHistory.prototype, "department", void 0);
exports.EmployeeDeptHistory = EmployeeDeptHistory = __decorate([
    (0, typeorm_1.Entity)({ name: 'empleado_depto_historial' })
], EmployeeDeptHistory);
//# sourceMappingURL=employee-dept-history.entity.js.map