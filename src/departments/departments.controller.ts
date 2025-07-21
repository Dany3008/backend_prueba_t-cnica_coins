// src/departments/departments.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetCompany } from '../common/decorators/get-company.decorator';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './department.entity';

@ApiTags('departments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly svc: DepartmentsService) {}

  @ApiOperation({ summary: 'Listar departamentos de la empresa' })
  @ApiResponse({ status: 200, description: 'Lista de departamentos.', type: [Department] })
  @Get()
  findAll(@GetCompany('companyId') companyId: number): Promise<Department[]> {
    return this.svc.findAll(companyId);
  }

  @ApiOperation({ summary: 'Crear un nuevo departamento' })
  @ApiBody({ type: CreateDepartmentDto })
  @ApiResponse({ status: 201, description: 'Departamento creado.', type: Department })
  @Post()
  create(
    @GetCompany('companyId') companyId: number,
    @Body() dto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.svc.create(companyId, dto);
  }

  @ApiOperation({ summary: 'Actualizar nombre y descripción de un departamento' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del departamento' })
  @ApiBody({ type: UpdateDepartmentDto })
  @ApiResponse({ status: 200, description: 'Departamento actualizado.', type: Department })
  @Patch(':id')
  update(
    @GetCompany('companyId') companyId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDepartmentDto,
  ): Promise<Department> {
    return this.svc.update(companyId, id, dto);
  }

  @ApiOperation({ summary: 'Eliminar un departamento' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del departamento' })
  @ApiResponse({ status: 204, description: 'Departamento eliminado.' })
  @HttpCode(204)
  @Delete(':id')
  remove(
    @GetCompany('companyId') companyId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.svc.remove(companyId, id);
  }
}