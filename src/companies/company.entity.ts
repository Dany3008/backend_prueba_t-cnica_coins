// src/companies/company.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Department } from '../departments/department.entity';
import { Employee } from '../employees/employee.entity';
import { RefreshToken } from '../auth/refresh-token.entity';
import { PasswordResetToken } from '../auth/password-reset.entity';

@Entity({ name: 'empresas' })
export class Company {
  @PrimaryGeneratedColumn({ name: 'empresa_id' })
  id: number;

  @Column({ name: 'nombre', length: 255 })
  name: string;

  @Column({ name: 'email', length: 255, unique: true })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  // Relaciones
  @OneToMany(() => Department, (dept) => dept.company)
  departamentos: Department[];

  @OneToMany(() => Employee, (emp) => emp.company)
  empleados: Employee[];

  @OneToMany(() => RefreshToken, (rt) => rt.company)
  refreshTokens: RefreshToken[];

  @OneToMany(() => PasswordResetToken, (prt) => prt.company)
  resetTokens: PasswordResetToken[];
}