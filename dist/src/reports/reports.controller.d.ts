import { ReportsService } from './reports.service';
import { SummaryReportDto } from './dto/summary-report.dto';
import { DateRangeDto } from './dto/date-range.dto';
import { Employee } from '../employees/employee.entity';
export declare class ReportsController {
    private readonly svc;
    constructor(svc: ReportsService);
    summary(companyId: number): Promise<SummaryReportDto>;
    employeesByDate(companyId: number, range: DateRangeDto): Promise<Employee[]>;
}
