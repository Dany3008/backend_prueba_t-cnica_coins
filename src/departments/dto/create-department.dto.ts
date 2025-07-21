// src/departments/dto/create-department.dto.ts
import { IsString, IsOptional } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Nombre del departamento' })
  @IsString()
  nombre: string

  @ApiPropertyOptional({ description: 'Descripción del departamento' })
  @IsOptional()
  @IsString()
  descripcion?: string
}