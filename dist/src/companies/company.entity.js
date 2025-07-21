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
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const department_entity_1 = require("../departments/department.entity");
const employee_entity_1 = require("../employees/employee.entity");
const refresh_token_entity_1 = require("../auth/refresh-token.entity");
const password_reset_entity_1 = require("../auth/password-reset.entity");
let Company = class Company {
    id;
    name;
    email;
    passwordHash;
    createdAt;
    updatedAt;
    deletedAt;
    departamentos;
    empleados;
    refreshTokens;
    resetTokens;
};
exports.Company = Company;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'empresa_id' }),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre', length: 255 }),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', length: 255, unique: true }),
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_hash', length: 255 }),
    __metadata("design:type", String)
], Company.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Company.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Company.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Date)
], Company.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => department_entity_1.Department, (dept) => dept.company),
    __metadata("design:type", Array)
], Company.prototype, "departamentos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.Employee, (emp) => emp.company),
    __metadata("design:type", Array)
], Company.prototype, "empleados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => refresh_token_entity_1.RefreshToken, (rt) => rt.company),
    __metadata("design:type", Array)
], Company.prototype, "refreshTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => password_reset_entity_1.PasswordResetToken, (prt) => prt.company),
    __metadata("design:type", Array)
], Company.prototype, "resetTokens", void 0);
exports.Company = Company = __decorate([
    (0, typeorm_1.Entity)({ name: 'empresas' })
], Company);
//# sourceMappingURL=company.entity.js.map