
import { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import { Document, Packer, Paragraph, TextRun } from "docx";


import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase"; 

export function usePacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [pacienteEditando, setPacienteEditando] = useState(null);

  
  const colRef = collection(db, "pacientes");

  //  Obtener pacientes desde Firestore
  const obtenerPacientes = async () => {
    try {
      const snapshot = await getDocs(colRef);
      const lista = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setPacientes(lista);
    } catch (err) {
      console.error("Error al obtener pacientes", err);
    }
  };

  //  Agregar paciente
  const agregarPaciente = async (paciente) => {
    try {
      await addDoc(colRef, paciente);
      await obtenerPacientes();
      alert("Paciente agregado");
    } catch (err) {
      console.error("Error al agregar paciente", err);
    }
  };

  //  Actualizar paciente
  const actualizarPaciente = async (idOriginal, paciente) => {
    try {
      const ref = doc(db, "pacientes", idOriginal);
      await updateDoc(ref, paciente);
      await obtenerPacientes();
      alert("Paciente actualizado");
    } catch (err) {
      console.error("Error al actualizar paciente", err);
    }
  };

  //  Eliminar paciente
  const eliminarPaciente = async (id) => {
    try {
      const ref = doc(db, "pacientes", id);
      await deleteDoc(ref);
      await obtenerPacientes();
      alert("Paciente eliminado");
    } catch (err) {
      console.error("Error al eliminar paciente", err);
    }
  };

  //  Buscador
  const pacientesFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase();
    if (!texto) return pacientes;
    return pacientes.filter((p) =>
      `${p.nombre} ${p.apellido} ${p.doctor} ${p.especialidad} ${p.diagnostico} ${p.tratamiento} ${p.comentario}`
        .toLowerCase()
        .includes(texto)
    );
  }, [pacientes, busqueda]);

  //  Exportar a Excel
  const exportarExcel = () => {
    if (!pacientes.length) {
      alert("No hay pacientes para exportar");
      return;
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(pacientes);
    XLSX.utils.book_append_sheet(wb, ws, "Pacientes");
    XLSX.writeFile(wb, "pacientes.xlsx");
  };

  //  Exportar a Word
  const exportarWord = async () => {
    if (!pacientes.length) {
      alert("No hay pacientes para exportar");
      return;
    }

    const docFile = new Document({
      sections: [
        {
          children: pacientes.map((p) => {
            return new Paragraph({
              children: [
                new TextRun(`ID: ${p.id}\n`),
                new TextRun(`Nombre: ${p.nombre}\n`),
                new TextRun(`Apellido: ${p.apellido}\n`),
                new TextRun(`Edad: ${p.edad}\n`),
                new TextRun(`Doctor: ${p.doctor}\n`),
                new TextRun(`Especialidad: ${p.especialidad}\n`),
                new TextRun(`Diagnóstico: ${p.diagnostico}\n`),
                new TextRun(`Tratamiento: ${p.tratamiento}\n`),
                new TextRun(`Comentario: ${p.comentario}\n\n`),
              ],
            });
          }),
        },
      ],
    });

    const blob = await Packer.toBlob(docFile);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pacientes.docx";
    link.click();
  };

  return {
    pacientes: pacientesFiltrados,
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
  };
}
