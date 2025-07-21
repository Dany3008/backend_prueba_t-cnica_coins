// src/employees/dto/create-employee.dto.ts
import {
  IsString,
  IsEmail,
  IsEnum,
  IsDateString,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Nombre del empleado' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Apellido del empleado' })
  @IsString()
  apellido: string;

  @ApiProperty({ description: 'Email del empleado' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Estado (activo o inactivo)',
    enum: ['activo', 'inactivo'],
    default: 'activo',
  })
  @IsOptional()
  @IsEnum(['activo', 'inactivo'])
  estado?: 'activo' | 'inactivo';

  @ApiProperty({ description: 'Fecha de contratación', format: 'date' })
  @IsDateString()
  fechaContratacion: string;

  @ApiPropertyOptional({
    description: 'ID del departamento asignado',
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  deptoId?: number;
}