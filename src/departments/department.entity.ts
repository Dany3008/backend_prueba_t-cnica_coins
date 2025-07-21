// src/departments/department.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
  OneToMany,
} from 'typeorm';
import { Company } from '../companies/company.entity';
import { Employee } from '../employees/employee.entity';
import { EmployeeDeptHistory } from '../dept-history/employee-dept-history.entity';

@Entity({ name: 'departamentos' })
export class Department {
  @PrimaryGeneratedColumn({ name: 'depto_id' })
  id: number;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion: string;
  
  @ManyToOne(() => Company, (c) => c.departamentos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'empresa_id' })
  company: Company;

  @RelationId((d: Department) => d.company)
  empresa_Id: number;

  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;


  @OneToMany(() => Employee, (e) => e.department)
  empleados: Employee[];

  @OneToMany(() => EmployeeDeptHistory, (h) => h.department)
  historial: EmployeeDeptHistory[];
  


}