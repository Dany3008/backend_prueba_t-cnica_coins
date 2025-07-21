// src/employees/employees.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetCompany } from '../common/decorators/get-company.decorator';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FilterEmployeesDto } from './dto/filter-employees.dto';

@ApiTags('employees')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly svc: EmployeesService) {}

  @ApiOperation({ summary: 'Listar empleados con filtros y paginación' })
  @ApiQuery({ name: 'deptoId', required: false, type: Number })
  @ApiQuery({ name: 'estado', required: false, enum: ['activo', 'inactivo'] })
  @ApiQuery({ name: 'fechaDesde', required: false, type: String })
  @ApiQuery({ name: 'fechaHasta', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Lista de empleados.' })
  @Get()
  findAll(
    @GetCompany() user: { companyId: number },
    @Query() filters: FilterEmployeesDto,
  ) {
    return this.svc.findAll(user.companyId, filters);
  }

  @ApiOperation({ summary: 'Crear un nuevo empleado' })
  @ApiBody({ type: CreateEmployeeDto })
  @ApiResponse({ status: 201, description: 'Empleado creado.' })
  @Post()
  create(
    @GetCompany() user: { companyId: number },
    @Body() dto: CreateEmployeeDto,
  ) {
    return this.svc.create(user.companyId, dto);
  }

  @ApiOperation({ summary: 'Obtener un empleado por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del empleado' })
  @ApiResponse({ status: 200, description: 'Empleado encontrado.' })
  @Get(':id')
  findOne(
    @GetCompany() user: { companyId: number },
    @Param('id') id: number,
  ) {
    return this.svc.findOne(user.companyId, id);
  }

  @ApiOperation({ summary: 'Actualizar un empleado' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del empleado' })
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiResponse({ status: 200, description: 'Empleado actualizado.' })
  @Patch(':id')
  update(
    @GetCompany() user: { companyId: number },
    @Param('id') id: number,
    @Body() dto: UpdateEmployeeDto,
  ) {
    return this.svc.update(user.companyId, id, dto);
  }

  @ApiOperation({ summary: 'Eliminar un empleado' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del empleado' })
  @ApiResponse({ status: 204, description: 'Empleado eliminado.' })
  @Delete(':id')
  remove(
    @GetCompany() user: { companyId: number },
    @Param('id') id: number,
  ) {
    return this.svc.remove(user.companyId, id);
  }
}