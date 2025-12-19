import type { Paciente } from "../types/Paciente";

export function validarPaciente(data: Partial<Paciente>): Paciente | null {
  if (
    typeof data.nombre === "string" && data.nombre.trim() !== "" &&
    typeof data.apellido === "string" && data.apellido.trim() !== "" &&
    ((typeof data.edad === "number" && data.edad > 0) || data.edad === null) &&
    typeof data.doctor === "string" && data.doctor.trim() !== "" &&
    typeof data.especialidad === "string" && data.especialidad.trim() !== "" &&
    typeof data.diagnostico === "string" &&
    typeof data.tratamiento === "string" &&
    typeof data.comentario === "string"
  ) {
    return data as Paciente;
  }
  console.error("Datos inválidos para Paciente:", data);
  return null;
}
