export interface Paciente {
  id?: string; 
    nombre: string;
    apellido: string;
    edad: number | null;
    doctor: string;
    especialidad: string;
    diagnostico?: string;
    tratamiento?: string;
    comentario?: string;
}
