import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FilterEmployeesDto } from './dto/filter-employees.dto';
export declare class EmployeesController {
    private readonly svc;
    constructor(svc: EmployeesService);
    findAll(user: {
        companyId: number;
    }, filters: FilterEmployeesDto): Promise<{
        data: import("./employee.entity").Employee[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(user: {
        companyId: number;
    }, dto: CreateEmployeeDto): Promise<import("./employee.entity").Employee>;
    findOne(user: {
        companyId: number;
    }, id: number): Promise<import("./employee.entity").Employee>;
    update(user: {
        companyId: number;
    }, id: number, dto: UpdateEmployeeDto): Promise<import("./employee.entity").Employee>;
    remove(user: {
        companyId: number;
    }, id: number): Promise<import("typeorm").UpdateResult>;
}
