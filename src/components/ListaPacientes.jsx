import React from "react";

const ListaPacientes = ({ pacientes, onEditar, onEliminar }) => {
  const crearFila = (titulo, valor, key) => (
    <tr key={key}>
      <th>{titulo}:</th>
      <td>{valor ?? ""}</td>
    </tr>
  );

  return (
    <>
      {pacientes.map((p) => (
        <React.Fragment key={p.id}>
          {crearFila("Nombre", p.nombre, `nombre-${p.id}`)}
          {crearFila("Apellido", p.apellido, `apellido-${p.id}`)}
          {crearFila("Edad", p.edad, `edad-${p.id}`)}
          {crearFila("Doctor", p.doctor, `doctor-${p.id}`)}
          {crearFila("Especialidad", p.especialidad, `esp-${p.id}`)}
          {crearFila("Diagnóstico", p.diagnostico, `diag-${p.id}`)}
          {crearFila("Tratamiento", p.tratamiento, `trat-${p.id}`)}

          <tr>
            <th colSpan={2}>Comentario</th>
          </tr>
          <tr>
            <td colSpan={2}>{p.comentario || ""}</td>
          </tr>

          <tr>
            <td colSpan={2}>
              <button className="btn-editar" onClick={() => onEditar(p)}>
                Editar
              </button>
              <button className="btn-eliminar" onClick={() => onEliminar(p.id)}>
                Eliminar
              </button>
            </td>
          </tr>

          <tr>
            <td colSpan={2} style={{ height: "20px" }} />
          </tr>
        </React.Fragment>
      ))}
    </>
  );
};

export default ListaPacientes;
