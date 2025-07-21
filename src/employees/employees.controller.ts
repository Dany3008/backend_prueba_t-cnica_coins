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
  ParseIntPipe, 
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
  @ApiQuery({ name: 'deptoId', required: false, type: Number, description: 'Filtrar por ID de departamento' })
  @ApiQuery({ name: 'estado', required: false, enum: ['activo', 'inactivo'], description: 'Filtrar por estado del empleado' })
  @ApiQuery({ name: 'fechaDesde', required: false, type: String, description: 'Fecha de contratación desde (YYYY-MM-DD)' })
  @ApiQuery({ name: 'fechaHasta', required: false, type: String, description: 'Fecha de contratación hasta (YYYY-MM-DD)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página (por defecto 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Elementos por página (por defecto 10)' })
  @ApiResponse({ status: 200, description: 'Lista de empleados devuelta exitosamente.' })
  @Get()
  findAll(
    @GetCompany('companyId') companyId: number,
    @Query() filters: FilterEmployeesDto, 
  ) {
    return this.svc.findAll(companyId, filters);
  }

  

  @ApiOperation({ summary: 'Crear un nuevo empleado' })
  @ApiBody({ type: CreateEmployeeDto, description: 'Datos del empleado a crear' })
  @ApiResponse({ status: 201, description: 'Empleado creado exitosamente.', type: CreateEmployeeDto }) // Consider returning the created employee's structure
  @ApiResponse({ status: 400, description: 'Datos inválidos o campos requeridos faltantes.' })
  @Post()
  create(
    @GetCompany('companyId') companyId: number, 
    @Body() dto: CreateEmployeeDto, 
  ) {
    return this.svc.create(companyId, dto);
  }

  

  @ApiOperation({ summary: 'Obtener un empleado por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID único del empleado' })
  @ApiResponse({ status: 200, description: 'Empleado encontrado y devuelto.', type: CreateEmployeeDto }) // Assuming CreateEmployeeDto structure for response
  @ApiResponse({ status: 404, description: 'Empleado no encontrado.' })
  @Get(':id')
  findOne(
    @GetCompany('companyId') companyId: number, 
    @Param('id', ParseIntPipe) id: number, 
  ) {
    return this.svc.findOne(companyId, id);
  }


  @ApiOperation({ summary: 'Actualizar un empleado existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID único del empleado a actualizar' })
  @ApiBody({ type: UpdateEmployeeDto, description: 'Datos parciales o completos del empleado para actualizar' })
  @ApiResponse({ status: 200, description: 'Empleado actualizado exitosamente.', type: UpdateEmployeeDto }) // Assuming UpdateEmployeeDto structure for response
  @ApiResponse({ status: 404, description: 'Empleado no encontrado.' })
  @Patch(':id')
  update(
    @GetCompany('companyId') companyId: number, 
    @Param('id', ParseIntPipe) id: number, 
    @Body() dto: UpdateEmployeeDto, 
  ) {
    return this.svc.update(companyId, id, dto);
  }



  @ApiOperation({ summary: 'Eliminar un empleado (soft-delete)' })
  @ApiParam({ name: 'id', type: Number, description: 'ID único del empleado a eliminar' })
  @ApiResponse({ status: 204, description: 'Empleado eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado.' })
  @Delete(':id')
  remove(
    @GetCompany('companyId') companyId: number, // Extracts 'companyId' from the authenticated user
    @Param('id', ParseIntPipe) id: number, // Extracts 'id' from URL and ensures it's a number
  ) {
    return this.svc.remove(companyId, id);
  }
}