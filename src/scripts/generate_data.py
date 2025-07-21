#!/usr/bin/env python3

"""
scripts/generate_data.py

Genera datos de prueba para las tablas:
- empresas
- departamentos
- empleados
- empleado_depto_historial

Requisitos:
  pip install mysql-connector-python python-dotenv faker
"""

import os
import random
import mysql.connector
from faker import Faker
from datetime import date, timedelta
from dotenv import load_dotenv

# Carga variables de entorno desde el .env en la raíz del proyecto
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))

DB_CONFIG = {
    'host':     os.getenv('DB_HOST', 'localhost'),
    'port':     int(os.getenv('DB_PORT', 3306)),
    'user':     os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_DATABASE', 'conishub'),
}


def get_connection():
    return mysql.connector.connect(**DB_CONFIG)


def insert_empresas(cursor, fake, count=3):
    empresa_ids = []
    for _ in range(count):
        nombre = fake.company().replace("'", "''")
        email = fake.company_email()
        password_hash = fake.sha256()
        cursor.execute(
            "INSERT INTO empresas (nombre, email, password_hash) VALUES (%s, %s, %s)",
            (nombre, email, password_hash),
        )
        empresa_ids.append(cursor.lastrowid)
    return empresa_ids


def insert_departamentos(cursor, fake, empresa_ids, per_empresa=4):
    departamentos = []
    for eid in empresa_ids:
        for _ in range(per_empresa):
            nombre = fake.bs().capitalize().replace("'", "''")
            descripcion = fake.catch_phrase().replace("'", "''")
            cursor.execute(
                "INSERT INTO departamentos (empresa_id, nombre, descripcion) VALUES (%s, %s, %s)",
                (eid, nombre, descripcion),
            )
            departamentos.append((cursor.lastrowid, eid))
    return departamentos


def insert_empleados(cursor, fake, departamentos, per_depto=5):
    empleados = []
    for depto_id, empresa_id in departamentos:
        for _ in range(per_depto):
            nombre = fake.first_name().replace("'", "''")
            apellido = fake.last_name().replace("'", "''")
            email = fake.email()
            estado = random.choice(['activo', 'inactivo'])
            fecha_contratacion = fake.date_between(start_date='-2y', end_date='today')
            cursor.execute(
                """INSERT INTO empleados
                   (empresa_id, depto_id, nombre, apellido, email, estado, fecha_contratacion)
                   VALUES (%s, %s, %s, %s, %s, %s, %s)""",
                (empresa_id, depto_id, nombre, apellido, email, estado, fecha_contratacion),
            )
            empleados.append((cursor.lastrowid, depto_id))
    return empleados


def insert_historial(cursor, empleados, max_entries=3):
    for emp_id, depto_id in empleados:
        start = date.today() - timedelta(days=random.randint(30, 365))
        for _ in range(random.randint(1, max_entries)):
            desde = start
            hasta = start + timedelta(days=random.randint(30, 120))
            cursor.execute(
                """INSERT INTO empleado_depto_historial
                   (empleado_id, depto_id, desde, hasta)
                   VALUES (%s, %s, %s, %s)""",
                (emp_id, depto_id, desde, hasta),
            )
            start = hasta + timedelta(days=1)


def main():
    fake = Faker()
    conn = get_connection()
    cursor = conn.cursor()

    try:
        # Truncate seguro en orden respetando FKs
        print("Eliminando datos previos (truncate seguro)...")
        cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")
        for tbl in [
            "empleado_depto_historial",
            "empleados",
            "departamentos",
            "empresas",
        ]:
            cursor.execute("SHOW TABLES LIKE %s", (tbl,))
            if cursor.fetchone():
                cursor.execute(f"TRUNCATE TABLE `{tbl}`;")
                print(f"  • {tbl} truncated")
            else:
                print(f"  • {tbl} not found, skipping")
        cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")
        conn.commit()

        # Inserción de datos
        print("Insertando empresas...")
        empresa_ids = insert_empresas(cursor, fake, count=3)
        conn.commit()

        print("Insertando departamentos...")
        departamentos = insert_departamentos(cursor, fake, empresa_ids, per_empresa=4)
        conn.commit()

        print("Insertando empleados...")
        empleados = insert_empleados(cursor, fake, departamentos, per_depto=6)
        conn.commit()

        print("Insertando historial de departamento...")
        insert_historial(cursor, empleados, max_entries=3)
        conn.commit()

        print("Datos de prueba generados exitosamente.")
    finally:
        cursor.close()
        conn.close()


if __name__ == '__main__':
    main()