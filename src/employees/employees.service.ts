// src/employees/employees.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FilterEmployeesDto } from './dto/filter-employees.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly repo: Repository<Employee>,
  ) {}

  async create(empresaId: number, dto: CreateEmployeeDto) {
    const emp = this.repo.create({ ...dto, empresaId });
    return this.repo.save(emp);
  }
  async findOne(empresaId: number, id: number) {
    const emp = await this.repo.findOne({
      where: { empresaId, id },
      relations: ['department'],
    });
    if (!emp) {
      throw new NotFoundException(`Empleado ${id} no encontrado`);
    }
    return emp;
  }

  async update(empresaId: number, id: number, dto: UpdateEmployeeDto) {
    await this.repo.update({ empresaId, id }, dto);
    return this.findOne(empresaId, id);
  }

  remove(empresaId: number, id: number) {
    return this.repo.softDelete({ empresaId, id });
  }

async findAll(companyId: number, filters: FilterEmployeesDto) {
  const qb = this.repo
    .createQueryBuilder('e')
    .where('e.empresaId = :companyId', { companyId });

  if (filters.deptoId) {
    qb.andWhere('e.deptoId = :deptoId', { deptoId: filters.deptoId });
  }
  if (filters.estado) {
    qb.andWhere('e.estado = :estado', { estado: filters.estado });
  }
  if (filters.fechaDesde) {
    qb.andWhere('e.fechaContratacion >= :desde', { desde: filters.fechaDesde });
  }
  if (filters.fechaHasta) {
    qb.andWhere('e.fechaContratacion <= :hasta', { hasta: filters.fechaHasta });
  }

  const page  = filters.page  || 1;
  const limit = filters.limit || 10;
  qb.skip((page - 1) * limit).take(limit);

  const [data, total] = await qb.getManyAndCount();
  return { data, total, page, limit };
  }
}