// src/app.module.ts

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { AppConfigModule } from './config/config.module';
import { AppController } from './app.controller';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeesModule } from './employees/employees.module';
//import { EmployeeDeptHistoryModule } from './dept-history/employee-dept-history.module';

@Module({
  imports: [
    AppConfigModule,

    // Configuración de Throttler para rate limiting
    ThrottlerModule.forRoot([
      {
        name: 'default', // Nombre de la configuración (importante para @Throttle)
        ttl: 60000,      // Tiempo de vida en milisegundos (ej. 60 segundos)
        limit: 10,       // Límite de solicitudes dentro del TTL
      },
    ]),

    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        logger: 'advanced-console',
        logging: ['error'],
        //logging: true, // Habilita el logging de consultas SQL
      
      }),
    }),

    CompaniesModule,
    AuthModule,
    DepartmentsModule,
    EmployeesModule,
    // EmployeeDeptHistoryModule,
  ],
  controllers: [AppController],
  providers: [
    // aplicar guard global de rate limit
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}