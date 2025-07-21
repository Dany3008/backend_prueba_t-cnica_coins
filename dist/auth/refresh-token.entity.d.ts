import { Company } from '../companies/company.entity';
export declare class RefreshToken {
    id: number;
    tokenHash: string;
    expiresAt: Date;
    company: Company;
    createdAt: Date;
}
