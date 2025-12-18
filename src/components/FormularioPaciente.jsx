import React, { useEffect, useState } from "react";
import { validarPaciente } from "../utils/validarPaciente";


const FormularioPaciente = ({ pacienteEditando, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    doctor: "",
    especialidad: "",
    diagnostico: "",
    tratamiento: "",
    comentario: "",
  });

  useEffect(() => {
    if (pacienteEditando) {
      setFormData({
        nombre: pacienteEditando.nombre || "",
        apellido: pacienteEditando.apellido || "",
        edad: pacienteEditando.edad ?? "",
        doctor: pacienteEditando.doctor || "",
        especialidad: pacienteEditando.especialidad || "",
        diagnostico: pacienteEditando.diagnostico || "",
        tratamiento: pacienteEditando.tratamiento || "",
        comentario: pacienteEditando.comentario || "",
      });
    } else {
      setFormData({
        nombre: "",
        apellido: "",
        edad: "",
        doctor: "",
        especialidad: "",
        diagnostico: "",
        tratamiento: "",
        comentario: "",
      });
    }
  }, [pacienteEditando]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const paciente = {
    ...formData,
    edad: formData.edad ? Number(formData.edad) : null,
  };

  const pacienteValido = validarPaciente(paciente);
  if (!pacienteValido) {
    alert("Datos inválidos. Revisa los campos.");
    return;
  }

  onGuardar(pacienteValido);
};


  return (
    <form id="paciente-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="nombre"
        placeholder="Nombre"
        required
        value={formData.nombre}
        onChange={handleChange}
      />

      <input
        type="text"
        id="apellido"
        placeholder="Apellido"
        required
        value={formData.apellido}
        onChange={handleChange}
      />

      <input
        type="number"
        id="edad"
        placeholder="Edad"
        value={formData.edad}
        onChange={handleChange}
      />

      <input
        type="text"
        id="doctor"
        placeholder="Doctor responsable"
        required
        value={formData.doctor}
        onChange={handleChange}
      />

      <input
        type="text"
        id="especialidad"
        placeholder="Especialidad"
        required
        value={formData.especialidad}
        onChange={handleChange}
      />

      <input
        type="text"
        id="diagnostico"
        placeholder="Diagnóstico"
        value={formData.diagnostico}
        onChange={handleChange}
      />

      <input
        type="text"
        id="tratamiento"
        placeholder="Tratamiento"
        value={formData.tratamiento}
        onChange={handleChange}
      />

      <textarea
        id="comentario"
        placeholder="Comentario"
        maxLength={300}
        value={formData.comentario}
        onChange={handleChange}
      />

      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancelar} style={{ marginLeft: "10px" }}>
        Cancelar
      </button>
    </form>
  );
};

export default FormularioPaciente;
