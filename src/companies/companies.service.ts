// src/companies/companies.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly repo: Repository<Company>,
  ) {}

  /** Busca una empresa por email */
    findByEmail(email: string) {
    return this.repo.findOne({
      where: { email },
      // withDeleted: true,  // descomenta para ver filas eliminadas
    });
    }
  /** Devuelve todas las empresas (solo para debug) */
  async findAll(): Promise<Company[]> {
    return this.repo.find();
  }

  /** Busca una empresa por su ID */
  async findById(id: number): Promise<Company> {
    const company = await this.repo.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException(`Empresa con id ${id} no encontrada`);
    }
    return company;
  }

  /** Crea una nueva empresa */
  async create(data: Partial<Company>): Promise<Company> {
    const company = this.repo.create(data);
    return this.repo.save(company);
  }

  /** Actualiza datos parciales de una empresa y devuelve la entidad actualizada */
  async update(id: number, partial: Partial<Company>): Promise<Company> {
    await this.repo.update(id, partial);
    return this.findById(id);
  }
}