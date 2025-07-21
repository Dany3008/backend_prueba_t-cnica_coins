// src/departments/departments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly repo: Repository<Department>,
  ) {}

  /**
   * Crea un nuevo departamento para la empresa autenticada.
   */
  async create(companyId: number, dto: CreateDepartmentDto) {
    const dept = this.repo.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      company: { id: companyId } as any,
    });
    return this.repo.save(dept);
  }

  /**
   * Lista todos los departamentos de la empresa autenticada.
   */
  findAll(companyId: number) {
    return this.repo.find({
      where: { company: { id: companyId } },
      order: { nombre: 'ASC' },
    });
  }

  /**
   * Actualiza nombre y/o descripción de un departamento y devuelve
   * todos sus campos (incluidos nombre y descripción).
   */
  async update(companyId: number, id: number, dto: UpdateDepartmentDto) {
    const dept = await this.repo.findOne({
      where: { id, company: { id: companyId } },
     
      });
    if (!dept) {
      throw new NotFoundException(`Departamento ${id} no encontrado`);
    }     
    
    if (dto.nombre !== undefined) {
      dept.nombre = dto.nombre;
    }
    if (dto.descripcion !== undefined) {
      dept.descripcion = dto.descripcion;
    }
     const updatedDept = await this.repo.save(dept);
    //this.logger.log(`Departamento ${id} de empresa ${companyId} actualizado.`);

    return updatedDept;
  }

  /**
   * Soft-delete de un departamento.
   */
  async remove(companyId: number, id: number) {
    const result = await this.repo.softDelete({
      id,
      company: { id: companyId } as any,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Departamento ${id} no encontrado`);
    }
  }
}