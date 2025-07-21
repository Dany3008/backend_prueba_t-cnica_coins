import { EmployeeDeptHistoryService } from './employee-dept-history.service';
import { AssignDepartmentDto } from './dto/assign-department.dto';
export declare class EmployeeDeptHistoryController {
    private readonly svc;
    constructor(svc: EmployeeDeptHistoryService);
    assign(user: {
        companyId: number;
    }, dto: AssignDepartmentDto): Promise<import("./employee-dept-history.entity").EmployeeDeptHistory>;
    release(id: number, hasta: string): Promise<import("./employee-dept-history.entity").EmployeeDeptHistory>;
    history(user: {
        companyId: number;
    }): Promise<import("./employee-dept-history.entity").EmployeeDeptHistory[]>;
}
