import { Department } from '../departments/department.entity';
import { Employee } from '../employees/employee.entity';
import { RefreshToken } from '../auth/refresh-token.entity';
import { PasswordResetToken } from '../auth/password-reset.entity';
export declare class Company {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    departamentos: Department[];
    empleados: Employee[];
    refreshTokens: RefreshToken[];
    resetTokens: PasswordResetToken[];
}
