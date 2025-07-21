// src/dept-history/employee-dept-history.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../employees/employee.entity';
import { Department } from '../departments/department.entity';

@Entity({ name: 'empleado_depto_historial' })
export class EmployeeDeptHistory {
  @PrimaryGeneratedColumn({ name: 'historial_id' })
  id: number;

  @Column({ name: 'empleado_id' })
  empleadoId: number;

  @Column({ name: 'depto_id' })
  deptoId: number;

  @Column({ name: 'desde', type: 'date' })
  desde: string;

  @Column({ name: 'hasta', type: 'date', nullable: true })
  hasta?: string;

  // Relación con Employee
  @ManyToOne(() => Employee, (e) => e.historial, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'empleado_id' })
  employee: Employee;

  // Relación con Department
  @ManyToOne(() => Department, (d) => d.historial, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'depto_id' })
  department: Department;
}