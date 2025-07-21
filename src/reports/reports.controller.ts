// src/reports/reports.controller.ts
import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard }       from '../common/guards/jwt-auth.guard';
import { GetCompany }         from '../common/decorators/get-company.decorator';
import { ReportsService }     from './reports.service';
import { SummaryReportDto }   from './dto/summary-report.dto';
import { DateRangeDto }       from './dto/date-range.dto';
import { Employee }           from '../employees/employee.entity';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly svc: ReportsService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Resumen de la empresa' })
  @ApiResponse({ status: 200, type: SummaryReportDto })
  summary(@GetCompany('companyId') companyId: number) {
    return this.svc.getSummary(companyId);
  }

  @Get('employees-by-date')
  @ApiOperation({ summary: 'Empleados por rango de fechas de contratación' })
  @ApiQuery({ name: 'hiredFrom', required: true, description: 'Fecha de inicio (YYYY-MM-DD)' })
  @ApiQuery({ name: 'hiredTo',   required: true, description: 'Fecha de fin (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, type: [Employee] })
  employeesByDate(
    @GetCompany('companyId') companyId: number,
    @Query() range: DateRangeDto,
  ) {
    return this.svc.getEmployeesByDate(companyId, range);
  }
}