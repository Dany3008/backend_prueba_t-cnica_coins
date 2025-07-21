// src/reports/dto/summary-report.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class SummaryReportDto {
  @ApiProperty({ description: 'Total de departamentos' })
  totalDepartments: number;

  @ApiProperty({ description: 'Total de empleados' })
  totalEmployees: number;

  @ApiProperty({ description: 'Empleados activos' })
  activeEmployees: number;

  @ApiProperty({ description: 'Empleados inactivos' })
  inactiveEmployees: number;
}