import { Repository } from 'typeorm';
import { Department } from '../departments/department.entity';
import { Employee } from '../employees/employee.entity';
import { DateRangeDto } from './dto/date-range.dto';
import { SummaryReportDto } from './dto/summary-report.dto';
export declare class ReportsService {
    private readonly deptRepo;
    private readonly empRepo;
    constructor(deptRepo: Repository<Department>, empRepo: Repository<Employee>);
    getSummary(companyId: number): Promise<SummaryReportDto>;
    getEmployeesByDate(companyId: number, range: DateRangeDto): Promise<Employee[]>;
}
