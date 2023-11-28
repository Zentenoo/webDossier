
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createTipoPlato } from "../helpers/helpercreateTipoPlato";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success(`Tipo de Plato "${nuevoTipoPlato.nombre}" creado con éxito`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      window.location.href = "/tipo_plato";
    } else {
      setError("Error al crear el tipo de plato");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
        <button className="btn btn-primary" onClick={handleCrearTipoPlato}>
          Crear Tipo de Plato
        </button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      </div>
      {/* <Link to="/tipo_plato" className="btn btn-secondary">
        Cancelar
      </Link> */}
    </div>
  );
};
