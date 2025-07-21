import { Company } from '../companies/company.entity';
export declare class PasswordResetToken {
    id: number;
    tokenHash: string;
    expiresAt: Date;
    company: Company;
    createdAt: Date;
}
