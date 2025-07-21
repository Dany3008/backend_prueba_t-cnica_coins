export declare class CreateEmployeeDto {
    nombre: string;
    apellido: string;
    email: string;
    estado?: 'activo' | 'inactivo';
    fechaContratacion: string;
    deptoId?: number;
}
