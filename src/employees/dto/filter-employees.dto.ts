// src/employees/dto/filter-employees.dto.ts
import {
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterEmployeesDto {
  @ApiPropertyOptional({ description: 'Filtrar por deptoId', type: Number })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  deptoId?: number;

  @ApiPropertyOptional({
    description: 'Filtrar por estado',
    enum: ['activo', 'inactivo'],
  })
  @IsOptional()
  @IsEnum(['activo', 'inactivo'])
  estado?: 'activo' | 'inactivo';

  @ApiPropertyOptional({
    description: 'Fecha contratación desde',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  fechaDesde?: string;

  @ApiPropertyOptional({
    description: 'Fecha contratación hasta',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDateString()
  fechaHasta?: string;

  @ApiPropertyOptional({
    description: 'Página (para paginación)',
    type: Number,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({
    description: 'Límite por página (paginación)',
    type: Number,
    default: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number;
}