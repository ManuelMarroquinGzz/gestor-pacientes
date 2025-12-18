import React, { useState, useRef, useEffect } from "react";

const MenuOpciones = ({ darkMode, onToggleDark, onExportExcel, onExportWord }) => {
  const [abierto, setAbierto] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  const toggleMenu = () => setAbierto((prev) => !prev);

  useEffect(() => {
    const handleClickFuera = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setAbierto(false);
      }
    };
    document.addEventListener("click", handleClickFuera);
    return () => document.removeEventListener("click", handleClickFuera);
  }, []);

  return (
    <div className="menu-opciones">
      <button id="btn-menu" ref={btnRef} onClick={toggleMenu}>
        ⋮ Opciones
      </button>

      <div
        id="menu-desplegable"
        ref={menuRef}
        className={abierto ? "" : "oculto"}
      >
        <button onClick={onToggleDark}>
          {darkMode ? "Modo claro" : "Modo oscuro"}
        </button>
        <button onClick={onExportExcel}>Exportar a Excel</button>
        <button onClick={onExportWord}>Exportar a Word</button>
      </div>
    </div>
  );
};

export default MenuOpciones;
