import { Repository } from 'typeorm';
import { EmployeeDeptHistory } from './employee-dept-history.entity';
import { AssignDepartmentDto } from './dto/assign-department.dto';
import { Employee } from '../employees/employee.entity';
import { Department } from '../departments/department.entity';
export declare class EmployeeDeptHistoryService {
    private readonly historyRepo;
    private readonly employeeRepo;
    private readonly departmentRepo;
    constructor(historyRepo: Repository<EmployeeDeptHistory>, employeeRepo: Repository<Employee>, departmentRepo: Repository<Department>);
    assign(companyId: number, dto: AssignDepartmentDto): Promise<EmployeeDeptHistory>;
    release(id: number, hasta: string): Promise<EmployeeDeptHistory>;
    history(companyId: number): Promise<EmployeeDeptHistory[]>;
}
