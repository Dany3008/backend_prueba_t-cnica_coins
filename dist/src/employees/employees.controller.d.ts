import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FilterEmployeesDto } from './dto/filter-employees.dto';
export declare class EmployeesController {
    private readonly svc;
    constructor(svc: EmployeesService);
    findAll(companyId: number, filters: FilterEmployeesDto): Promise<{
        data: import("./employee.entity").Employee[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(companyId: number, dto: CreateEmployeeDto): Promise<import("./employee.entity").Employee>;
    findOne(companyId: number, id: number): Promise<import("./employee.entity").Employee>;
    update(companyId: number, id: number, dto: UpdateEmployeeDto): Promise<import("./employee.entity").Employee>;
    remove(companyId: number, id: number): Promise<import("typeorm").UpdateResult>;
}
