// src/dept-history/employee-dept-history.controller.ts

import {
  Controller,
  Post,
  Patch,
  Get,
  Body,
  Param,
  UseGuards,
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
import { EmployeeDeptHistoryService } from './employee-dept-history.service';
import { AssignDepartmentDto } from './dto/assign-department.dto';

@ApiTags('dept-history')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dept-history')
export class EmployeeDeptHistoryController {
  constructor(private readonly svc: EmployeeDeptHistoryService) {}

  @ApiOperation({ summary: 'Registrar inicio de asignación de departamento' })
  @ApiBody({ type: AssignDepartmentDto })
  @ApiResponse({ status: 201, description: 'Asignación registrada.' })
  @Post('assign')
  assign(
    @GetCompany() user: { companyId: number },
    @Body() dto: AssignDepartmentDto,
  ) {
    return this.svc.assign(user.companyId, dto);
  }

  @ApiOperation({ summary: 'Registrar fin de asignación de departamento' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de historial' })
  @ApiBody({ schema: { properties: { hasta: { type: 'string', format: 'date' } } } })
  @ApiResponse({ status: 200, description: 'Asignación finalizada.' })
  @Patch('release/:id')
  release(
    @Param('id') id: number,
    @Body('hasta') hasta: string,
  ) {
    return this.svc.release(+id, hasta);
  }

  @ApiOperation({ summary: 'Listar historial de asignaciones' })
  @ApiResponse({ status: 200, description: 'Historial obtenido.' })
  @Get()
  history(@GetCompany() user: { companyId: number }) {
    return this.svc.history(user.companyId);
  }
}