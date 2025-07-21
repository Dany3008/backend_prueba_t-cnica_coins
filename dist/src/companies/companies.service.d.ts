import { Repository } from 'typeorm';
import { Company } from './company.entity';
export declare class CompaniesService {
    private readonly repo;
    constructor(repo: Repository<Company>);
    findByEmail(email: string): Promise<Company | null>;
    findAll(): Promise<Company[]>;
    findById(id: number): Promise<Company>;
    create(data: Partial<Company>): Promise<Company>;
    update(id: number, partial: Partial<Company>): Promise<Company>;
}
