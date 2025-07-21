import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
export declare class DepartmentsService {
    private readonly repo;
    constructor(repo: Repository<Department>);
    create(companyId: number, dto: CreateDepartmentDto): Promise<Department>;
    findAll(companyId: number): Promise<Department[]>;
    update(companyId: number, id: number, dto: UpdateDepartmentDto): Promise<Department>;
    remove(companyId: number, id: number): Promise<void>;
}
