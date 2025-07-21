// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// importa tu filter e interceptor desde common
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // habilita CORS solo desde localhost
  app.enableCors({ origin: /http:\/\/localhost(:\d+)?$/ });

  // validación global con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,                 // descarta props no definidas en DTO
      forbidNonWhitelisted: true,      // rechaza requests con props extras
      transform: true,                 // transforma payloads a instancias de DTO
      transformOptions: {
        enableImplicitConversion: true // convierte strings a números/booleanos si el DTO lo requiere
      },
    }),
  );

  // manejo global de excepciones
  app.useGlobalFilters(new AllExceptionsFilter());

  // logging de cada request
  app.useGlobalInterceptors(new LoggingInterceptor());

  // opcional: prefijo global para todas las rutas
  // app.setGlobalPrefix('api');

  // --- Configuración Swagger ---
  const config = new DocumentBuilder()
    .setTitle('CoinsHub API')
    .setDescription('Documentación de la API de CoinsHub')
    .setVersion('1.0')
    .addBearerAuth() // habilita auth en Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  // --------------------------------

  await app.listen(3000);
  console.log('API corriendo en http://localhost:3000');
  console.log('Swagger UI disponible en http://localhost:3000/api-docs');
}

bootstrap();