// src/dept-history/dto/assign-department.dto.ts
import { IsInt, Min, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AssignDepartmentDto {
  @ApiProperty({ description: 'ID del empleado', minimum: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  employeeId: number;

  @ApiProperty({
    description: 'Fecha desde de la asignación',
    type: String,
    format: 'date',
  })
  @IsDateString()
  desde: string;
}