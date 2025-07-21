import { Company } from '../companies/company.entity';
import { Employee } from '../employees/employee.entity';
import { EmployeeDeptHistory } from '../dept-history/employee-dept-history.entity';
export declare class Department {
    id: number;
    nombre: string;
    descripcion: string;
    company: Company;
    empresa_Id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    empleados: Employee[];
    historial: EmployeeDeptHistory[];
}
