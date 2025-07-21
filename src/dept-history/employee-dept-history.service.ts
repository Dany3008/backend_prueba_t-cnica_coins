// src/dept-history/employee-dept-history.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeDeptHistory } from './employee-dept-history.entity';
import { AssignDepartmentDto } from './dto/assign-department.dto';
import { Employee } from '../employees/employee.entity';
import { Department } from '../departments/department.entity';

@Injectable()
export class EmployeeDeptHistoryService {
  constructor(
    @InjectRepository(EmployeeDeptHistory)
    private readonly historyRepo: Repository<EmployeeDeptHistory>,

    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,

    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
  ) {}

  async assign(companyId: number, dto: AssignDepartmentDto) {
    // 1. Verificar empleado
    const employee = await this.employeeRepo.findOne({
      where: { id: dto.employeeId, empresaId: companyId },
    });
    if (!employee) {
      throw new BadRequestException(`Empleado ${dto.employeeId} no encontrado`);
    }

    // 2. Verificar que exista el departamento actual
    const dept = await this.departmentRepo.findOne({
      where: { id: employee.deptoId, empresa_Id: companyId },
    });
    if (!dept) {
      throw new BadRequestException(
        `Departamento ${employee.deptoId} no encontrado`,
      );
    }

    // 3. Crear registro de histórico
    const hist = this.historyRepo.create({
      empleadoId: dto.employeeId,
      deptoId: employee.deptoId,
      desde: dto.desde,
    });
    return this.historyRepo.save(hist);
  }

  async release(id: number, hasta: string) {
    const hist = await this.historyRepo.findOne({ where: { id } });
    if (!hist) {
      throw new NotFoundException(`Historial ${id} no encontrado`);
    }
    hist.hasta = hasta;
    return this.historyRepo.save(hist);
  }

  async history(companyId: number) {
    return this.historyRepo.find({
      relations: ['employee', 'department'],
      where: {
        employee: { empresaId: companyId },
      },
    });
  }
}