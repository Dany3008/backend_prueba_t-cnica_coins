"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeDeptHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_dept_history_entity_1 = require("./employee-dept-history.entity");
const employee_dept_history_service_1 = require("./employee-dept-history.service");
const employee_dept_history_controller_1 = require("./employee-dept-history.controller");
let EmployeeDeptHistoryModule = class EmployeeDeptHistoryModule {
};
exports.EmployeeDeptHistoryModule = EmployeeDeptHistoryModule;
exports.EmployeeDeptHistoryModule = EmployeeDeptHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employee_dept_history_entity_1.EmployeeDeptHistory])],
        providers: [employee_dept_history_service_1.EmployeeDeptHistoryService],
        controllers: [employee_dept_history_controller_1.EmployeeDeptHistoryController],
        exports: [employee_dept_history_service_1.EmployeeDeptHistoryService],
    })
], EmployeeDeptHistoryModule);
//# sourceMappingURL=employee-dept-history.module.js.map