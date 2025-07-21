// src/app.controller.ts
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CompaniesService } from './companies/companies.service';

@Controller()
export class AppController {
  constructor(private readonly companiesService: CompaniesService) {}


  @Get('all-companies')
  async allCompanies() {
    return this.companiesService.findAll();
  }

  @Get('test-company')
  async testCompanyConnection() {
    try {      
      const email = 'test@empresa.com';
      const company = await this.companiesService.findByEmail(email);
      if (!company) {
        throw new HttpException('Empresa no encontrada', HttpStatus.NOT_FOUND);
      }
      return { status: 'OK', data:company  };
    } catch (error) {
      throw new HttpException(
        `Error en CompaniesService: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}