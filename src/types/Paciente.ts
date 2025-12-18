export interface Paciente {
  id?: string; // generado automáticamente por Firestore
    nombre: string;
    apellido: string;
    edad: number | null;
    doctor: string;
    especialidad: string;
    diagnostico?: string;
    tratamiento?: string;
    comentario?: string;
}
