CoinsHub API

API construida con NestJS, TypeORM y MySQL para gestión de empresas, departamentos, empleados e historial de asignaciones.

1. Prerrequisitos
   - Node.js ≥ 16
   - npm o Yarn
   - MySQL ≥ 5.7
   - Python ≥ 3.8 (para generar datos de prueba)

2. Instalación
   a. Clona el repositorio:
      git clone https://github.com/tu-usuario/gestion-empresas-backend.git
      cd gestion-empresas-backend

   b. Crea el archivo de entorno:
      cp .env.example .env
      Ajusta en .env tu conexión a MySQL y tus variables JWT:
         DB_HOST=localhost
         DB_PORT=3306
         DB_USER=root
         DB_PASSWORD=secret
         DB_NAME=gestion_empresas
         JWT_SECRET=TuSecretoSuperSeguro
         JWT_EXPIRES_IN=3600s

   c. Instala dependencias:
      npm install
      (o yarn install)

3. Comandos disponibles
   - Levantar en modo desarrollo:
       npm run start:dev
   - Build & producción:
       npm run build
       npm run start:prod
   - Generar datos de prueba (Python):
       cd scripts
       python generate_data.py > seed.sql
       mysql -u root -p gestion_empresas < seed.sql

4. Estructura de la base de datos

   Tabla “empresas”
     empresa_id     int PK auto-incremental
     nombre         varchar
     email          varchar UNIQUE
     password_hash  varchar
     created_at     timestamp
     updated_at     timestamp
     deleted_at     timestamp NULL

   Tabla “departamentos”
     depto_id       int PK auto-incremental
     empresa_id     int FK → empresas.empresa_id
     nombre         varchar
     descripcion    text NULL
     created_at     timestamp
     updated_at     timestamp
     deleted_at     timestamp NULL

   Tabla “empleados”
     empleado_id        int PK auto-incremental
     empresa_id         int FK → empresas.empresa_id
     depto_id           int FK → departamentos.depto_id
     nombre             varchar
     apellido           varchar
     email              varchar
     estado             enum(activo, inactivo)
     fecha_contratacion date
     created_at         timestamp
     updated_at         timestamp
     deleted_at         timestamp NULL

   Tabla “empleado_depto_historial”
     historial_id  int PK auto-incremental
     empleado_id   int FK → empleados.empleado_id
     depto_id      int FK → departamentos.depto_id
     desde         date
     hasta         date NULL

5. Ejemplos de uso (cURL)

   Autenticación
     Registro:
       curl -X POST http://localhost:3000/auth/register \
         -H "Content-Type: application/json" \
         -d '{"email":"demo@empresa.com","name":"Demo S.A.","password":"demo1234"}'
     Login:
       curl -X POST http://localhost:3000/auth/login \
         -H "Content-Type: application/json" \
         -d '{"email":"demo@empresa.com","password":"demo1234"}'

   Departamentos
     Listar:
       curl http://localhost:3000/departments \
         -H "Authorization: Bearer <TOKEN>"
     Crear:
       curl -X POST http://localhost:3000/departments \
         -H "Authorization: Bearer <TOKEN>" \
         -H "Content-Type: application/json" \
         -d '{"nombre":"Ventas","descripcion":"Ventas_locales"}'
     Actualizar:
       curl -X PATCH http://localhost:3000/departments/1 \
         -H "Authorization: Bearer <TOKEN>" \
         -H "Content-Type: application/json" \
         -d '{"descripcion":"dpt de ingenieria"}'
     Eliminar:
       curl -X DELETE http://localhost:3000/departments/1 \
         -H "Authorization: Bearer <TOKEN>"

   Empleados con filtros
     curl "http://localhost:3000/employees?deptoId=1&estado=activo&page=1&limit=5" \
       -H "Authorization: Bearer <TOKEN>"

6. Documentación Swagger

   Abre en tu navegador:
     http://localhost:3000/api-docs

    Para validar tus endpoints de reports en Postman, añade en la pestaña **Tests** de cada request estos scripts:

---

### 1) GET /reports/summary
validacion en postman
Request  
```
GET {{base_url}}/reports/summary
Authorization: Bearer {{accessToken}}
```

Tests (copiar en la pestaña “Tests”):

```js
// 1) Status 200
pm.test("Status code is 200", () => {
  pm.response.to.have.status(200);
});

// 2) Schema básico
pm.test("Body tiene las 4 propiedades esperadas", () => {
  const json = pm.response.json();
  pm.expect(json).to.be.an("object");
  pm.expect(json).to.have.property("totalDepartments").that.is.a("number");
  pm.expect(json).to.have.property("totalEmployees").that.is.a("number");
  pm.expect(json).to.have.property("activeEmployees").that.is.a("number");
  pm.expect(json).to.have.property("inactiveEmployees").that.is.a("number");
});

// 3) Coherencia de totales
pm.test("totalEmployees === activeEmployees + inactiveEmployees", () => {
  const { totalEmployees, activeEmployees, inactiveEmployees } = pm.response.json();
  pm.expect(totalEmployees).to.eql(activeEmployees + inactiveEmployees);
});
```

---

### 2) GET /reports/employees-by-date

Request  
```
GET {{base_url}}/reports/employees-by-date?hiredFrom={{hiredFrom}}&hiredTo={{hiredTo}}
Authorization: Bearer {{accessToken}}
```

Tests:

```js
// 1) Status 200
pm.test("Status code is 200", () => {
  pm.response.to.have.status(200);
});

// 2) Es un array de empleados
pm.test("Body es un array", () => {
  pm.expect(pm.response.json()).to.be.an("array");
});

// 3) Cada empleado tiene los campos esperados y fecha en rango
pm.test("Cada empleado tiene id, nombre y fechaContratacion válida", () => {
  const arr = pm.response.json();
  const from = new Date(pm.request.url.getQueryString().match(/hiredFrom=([^&]*)/)[1]);
  const to   = new Date(pm.request.url.getQueryString().match(/hiredTo=([^&]*)/)[1]);

  arr.forEach(emp => {
    pm.expect(emp).to.have.property("id").that.is.a("number");
    pm.expect(emp).to.have.property("nombre").that.is.a("string");
    pm.expect(emp).to.have.property("fechaContratacion").that.is.a("string");

    const hired = new Date(emp.fechaContratacion);
    pm.expect(hired >= from && hired <= to, 
      `fechaContratacion fuera de rango: ${emp.fechaContratacion}`)
      .to.be.true;
  });
});
```

---

Con estos test scripts Postman validará:

- Que responda correctamente (200)  
- La forma y tipos de datos  
- La lógica de tus reportes (sumas y rangos de fecha)  
- Te ayudará a atrapar regresiones si cambias la lógica más adelante.



