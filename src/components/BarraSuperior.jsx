import React from "react";
import MenuOpciones from "./MenuOpciones";

const BarraSuperior = ({ formVisible, toggleForm, busqueda, setBusqueda, darkMode, onToggleDark, onExportExcel, onExportWord }) => {
  return (
    <div className="barra-superior">
      <button id="toggle-form" onClick={toggleForm}>
        {formVisible ? "Cerrar formulario" : "Agregar paciente"}
      </button>

      <input
        type="text"
        id="buscador"
        placeholder="Buscar paciente..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* AQUÍ va MenuOpciones, dentro de la barra */}
      <MenuOpciones
        darkMode={darkMode}
        onToggleDark={onToggleDark}
        onExportExcel={onExportExcel}
        onExportWord={onExportWord}
      />
    </div>
  );
};

export default BarraSuperior;
