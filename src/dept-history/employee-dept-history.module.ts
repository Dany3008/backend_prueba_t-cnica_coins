// src/dept-history/employee-dept-history.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeDeptHistory } from './employee-dept-history.entity';
import { EmployeeDeptHistoryService } from './employee-dept-history.service';
import { EmployeeDeptHistoryController } from './employee-dept-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeDeptHistory])],
  providers: [EmployeeDeptHistoryService],
  controllers: [EmployeeDeptHistoryController],
  exports: [EmployeeDeptHistoryService],
})
export class EmployeeDeptHistoryModule {}