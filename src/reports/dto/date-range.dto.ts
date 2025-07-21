// src/reports/dto/date-range.dto.ts
import { IsDateString } from 'class-validator';
import { ApiProperty }   from '@nestjs/swagger';

export class DateRangeDto {
  @ApiProperty({ description: 'Fecha de inicio (YYYY-MM-DD)' })
  @IsDateString()
  hiredFrom: string;

  @ApiProperty({ description: 'Fecha de fin (YYYY-MM-DD)' })
  @IsDateString()
  hiredTo: string;
}