import React, { useEffect, useState } from "react";
import { usePacientes } from "./hooks/usePacientes";
import BarraSuperior from "./components/BarraSuperior";
import FormularioPaciente from "./components/FormularioPaciente";
import ListaPacientes from "./components/ListaPacientes";

const App = () => {
  const {
    pacientes,
    obtenerPacientes,
    agregarPaciente,
    actualizarPaciente,
    eliminarPaciente,
    busqueda,
    setBusqueda,
    pacienteEditando,
    setPacienteEditando,
    exportarExcel,
    exportarWord,
  } = usePacientes();

  const [formVisible, setFormVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Cargar pacientes desde Firestore al iniciar
  useEffect(() => {
    obtenerPacientes();
  }, []);

  // Modo oscuro con persistencia
  useEffect(() => {
    const stored = localStorage.getItem("dark-mode") === "true";
    setDarkMode(stored);
    if (stored) document.body.classList.add("dark-mode");
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("dark-mode", darkMode);
  }, [darkMode]);

  // Mostrar/ocultar formulario
  const toggleForm = () => {
    setFormVisible((prev) => !prev);

    if (!formVisible) {
      // Si se abre el formulario y no hay edición, limpiar selección
      if (!pacienteEditando) setPacienteEditando(null);
    } else {
      // Si se cierra, limpiar edición
      setPacienteEditando(null);
    }
  };

  // Guardar paciente (nuevo o editado)
  const handleGuardar = async (paciente) => {
    if (pacienteEditando) {
      await actualizarPaciente(pacienteEditando.id, paciente);
    } else {
      await agregarPaciente(paciente);
    }

    setPacienteEditando(null);
    setFormVisible(false);
  };

  // Editar paciente
  const handleEditar = (paciente) => {
    setPacienteEditando(paciente);
    if (!formVisible) setFormVisible(true);
  };

  // Eliminar paciente
  const handleEliminar = async (id) => {
    const ok = window.confirm("¿Seguro que deseas eliminar este paciente?");
    if (!ok) return;
    await eliminarPaciente(id);
  };

  const handleToggleDark = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div>
      <BarraSuperior
        formVisible={formVisible}
        toggleForm={toggleForm}
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        darkMode={darkMode}
        onToggleDark={handleToggleDark}
        onExportExcel={exportarExcel}
        onExportWord={exportarWord}
      />

      {formVisible && (
        <section id="form-section">
          <h2 id="titulo-form">
            {pacienteEditando ? "Editar paciente" : "Agregar nuevo paciente"}
          </h2>

          <FormularioPaciente
            pacienteEditando={pacienteEditando}
            onGuardar={handleGuardar}
            onCancelar={() => {
              setPacienteEditando(null);
              setFormVisible(false);
            }}
          />
        </section>
      )}

      <table>
        <tbody id="lista">
          <ListaPacientes
            pacientes={pacientes}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
          />
        </tbody>
      </table>
    </div>
  );
};

export default App;
