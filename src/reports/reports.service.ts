// src/reports/reports.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';
import { Department }       from '../departments/department.entity';
import { Employee }         from '../employees/employee.entity';
import { DateRangeDto }     from './dto/date-range.dto';
import { SummaryReportDto } from './dto/summary-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Department)
    private readonly deptRepo: Repository<Department>,

    @InjectRepository(Employee)
    private readonly empRepo: Repository<Employee>,
  ) {}

  /**
   * Resumen de la empresa:
   * - total de departamentos
   * - total de empleados
   * - empleados activos e inactivos
   */
  async getSummary(companyId: number): Promise<SummaryReportDto> {
    const [{ count: totalDepartments }] = await this.deptRepo
      .createQueryBuilder('d')
      .where('d.empresa_id = :companyId', { companyId })
      .select('COUNT(d.depto_id)', 'count')
      .getRawMany();

    const [{ count: totalEmployees }] = await this.empRepo
      .createQueryBuilder('e')
      .where('e.empresa_id = :companyId', { companyId })
      .select('COUNT(e.empleado_id)', 'count')
      .getRawMany();

    const [{ count: activeEmployees }] = await this.empRepo
      .createQueryBuilder('e')
      .where('e.empresa_id = :companyId', { companyId })
      .andWhere('e.estado = :status', { status: 'ACTIVO' })
      .select('COUNT(e.empleado_id)', 'count')
      .getRawMany();

    return {
      totalDepartments:   +totalDepartments,
      totalEmployees:     +totalEmployees,
      activeEmployees:    +activeEmployees,
      inactiveEmployees:  +totalEmployees - +activeEmployees,
    };
  }

  /**
   * Lista empleados contratados en un rango de fechas.
   */
  async getEmployeesByDate(
    companyId: number,
    range: DateRangeDto,
  ): Promise<Employee[]> {
    return this.empRepo
      .createQueryBuilder('e')
      .where('e.empresa_id = :companyId', { companyId })
      .andWhere('e.fecha_contratacion BETWEEN :from AND :to', {
        from: range.hiredFrom,
        to:   range.hiredTo,
      })
      .orderBy('e.fecha_contratacion', 'ASC')
      .getMany();
  }
}