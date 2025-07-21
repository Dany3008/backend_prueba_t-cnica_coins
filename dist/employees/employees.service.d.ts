import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FilterEmployeesDto } from './dto/filter-employees.dto';
export declare class EmployeesService {
    private readonly repo;
    constructor(repo: Repository<Employee>);
    create(empresaId: number, dto: CreateEmployeeDto): Promise<Employee>;
    findOne(empresaId: number, id: number): Promise<Employee>;
    update(empresaId: number, id: number, dto: UpdateEmployeeDto): Promise<Employee>;
    remove(empresaId: number, id: number): Promise<import("typeorm").UpdateResult>;
    findAll(companyId: number, filters: FilterEmployeesDto): Promise<{
        data: Employee[];
        total: number;
        page: number;
        limit: number;
    }>;
}
