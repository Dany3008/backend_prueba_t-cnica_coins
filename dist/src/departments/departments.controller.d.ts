import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './department.entity';
export declare class DepartmentsController {
    private readonly svc;
    constructor(svc: DepartmentsService);
    findAll(companyId: number): Promise<Department[]>;
    create(companyId: number, dto: CreateDepartmentDto): Promise<Department>;
    update(companyId: number, id: number, dto: UpdateDepartmentDto): Promise<Department>;
    remove(companyId: number, id: number): Promise<void>;
}
