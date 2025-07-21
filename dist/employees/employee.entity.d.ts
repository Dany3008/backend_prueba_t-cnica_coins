import { Company } from '../companies/company.entity';
import { Department } from '../departments/department.entity';
import { EmployeeDeptHistory } from '../dept-history/employee-dept-history.entity';
export declare class Employee {
    id: number;
    empresaId: number;
    deptoId: number;
    nombre: string;
    apellido: string;
    email: string;
    estado: 'activo' | 'inactivo';
    fechaContratacion: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    company: Company;
    department: Department;
    historial: EmployeeDeptHistory[];
}
