// src/employees/employee.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Company } from '../companies/company.entity';
import { Department } from '../departments/department.entity';
import { EmployeeDeptHistory } from '../dept-history/employee-dept-history.entity';

@Entity({ name: 'empleados' })
export class Employee {
  @PrimaryGeneratedColumn({ name: 'empleado_id' })
  id: number;

  @Column({ name: 'empresa_id' })
  empresaId: number;

  @Column({ name: 'depto_id' })
  deptoId: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'apellido' })
  apellido: string;

  @Column({ name: 'email' })
  email: string;

  @Column({
    name: 'estado',
    type: 'enum',
    enum: ['activo', 'inactivo'],
    default: 'activo',
  })
  estado: 'activo' | 'inactivo';

  @Column({ name: 'fecha_contratacion', type: 'date' })
  fechaContratacion: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  // Relación con Company
  @ManyToOne(() => Company, (c) => c.empleados, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'empresa_id' })
  company: Company;

  // Relación con Department
  @ManyToOne(() => Department, (d) => d.empleados, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'depto_id' })
  department: Department;

  // Historial de asignaciones
  @OneToMany(() => EmployeeDeptHistory, (h) => h.employee)
  historial: EmployeeDeptHistory[];
}