
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editTipoPlato } from "../helpers/helpereditTipoPlato";
import { getTipoPlatoById } from "../helpers/helpergetTipoPlatoById";
import { getAllTipoPlato } from "../helpers/getAllTipoPlato";

export const EditTipoPlatoPage = ({ idtipo, nombretipo, descripciontipo }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");


  useEffect(() => {
    setNombre(nombretipo);
    setDescripcion(descripciontipo);
  }, []);



  const handleGuardarCambios = async () => {
    const exito =await editTipoPlato(idtipo, nombre, descripcion);
    if(exito)
    {
      window.location.href = "/tipo_plato";
    }
  };

  return (
    <div className="container">
      <div className="form-group">
        <label htmlFor="nombre" style={{ color: 'black' }}>Nombre:</label>
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
      <div className="modal-header d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleGuardarCambios}>
          Guardar Cambios
        </button>
        <button id="cancelButton" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </div>
  );
};