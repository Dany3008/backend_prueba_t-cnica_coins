import { Employee } from '../employees/employee.entity';
import { Department } from '../departments/department.entity';
export declare class EmployeeDeptHistory {
    id: number;
    empleadoId: number;
    deptoId: number;
    desde: string;
    hasta?: string;
    employee: Employee;
    department: Department;
}
