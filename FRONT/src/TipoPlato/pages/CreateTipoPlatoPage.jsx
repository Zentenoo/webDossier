import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createTipoPlato } from "../helpers/helpercreateTipoPlato";

export const CreateTipoPlatoPage = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  const handleCrearTipoPlato = async () => {
    if (nombre.trim() === "" || descripcion.trim() === "") {
      setError("Nombre y descripción son campos obligatorios");
      return;
    }

    const nuevoTipoPlato = { nombre, descripcion };
    const exito = await createTipoPlato(nuevoTipoPlato);

    if (exito) {
      // Redirige a la página de lista de tipos de plato después de la creación
      window.location.href = "/tipo_plato";
    } else {
      setError("Error al crear el tipo de plato");
    }
  };

  return (
    <div className="container">
      <h1>Crear Nuevo Tipo de Plato</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          className="form-control"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleCrearTipoPlato}>
        Crear Tipo de Plato
      </button>
      <Link to="/tipo_plato" className="btn btn-secondary">
        Cancelar
      </Link>
    </div>
  );
};