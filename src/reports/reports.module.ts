// src/reports/reports.module.ts
import { Module }           from '@nestjs/common';
import { TypeOrmModule }    from '@nestjs/typeorm';
import { ReportsService }   from './reports.service';
import { ReportsController }from './reports.controller';
import { Department }       from '../departments/department.entity';
import { Employee }         from '../employees/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Department, Employee]),
  ],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}