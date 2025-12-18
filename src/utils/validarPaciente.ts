import { Paciente } from "../types/Paciente";

export function validarPaciente(data: any): Paciente | null {
if (
    typeof data.nombre === "string" &&
    typeof data.apellido === "string" &&
    (typeof data.edad === "number" || data.edad === null) &&
    typeof data.doctor === "string" &&
    typeof data.especialidad === "string"
) {
    return data as Paciente;
    }
    console.error("Datos inválidos para Paciente:", data);
    return null;
}
