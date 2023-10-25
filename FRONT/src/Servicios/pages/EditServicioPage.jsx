import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getServicioById } from "../helpers/helpergeServicioById";
import { editServicio } from "../helpers/helpereditServicio";

export const EditServicioPage = () => {
  const { id } = useParams();
  const [servicio, setServicio] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    getServicioById(id).then((data) => {
      if (data === "error") {
        setError("Error al obtener el servicio");
        return;
      }

      setServicio(data);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServicio({ ...servicio, [name]: value });
  };

  const handleUpdateServicio = async () => {
    const success = await editServicio(servicio);
    if (success) {
      // Redirige a la página de lista de servicios después de la actualización
      window.location.href = "/Servicio";
    } else {
      setError("Error al actualizar el servicio");
    }
  };

  return (
    <div className="container">
      <h1>Editar Servicio</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          className="form-control"
          value={servicio.nombre}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          className="form-control"
          value={servicio.descripcion}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaInicio">Fecha Inicio:</label>
        <input
          type="date"
          id="fechaInicio"
          className="form-control"
          value={servicio.fechaInicio}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaFin">Fecha Fin:</label>
        <input
          type="date"
          id="fechaFin"
          className="form-control"
          value={servicio.fechaFin}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cupo">Cupo:</label>
        <input
          type="number"
          id="cupo"
          className="form-control"
          value={servicio.cupo}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          className="form-control"
          value={servicio.precio}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdateServicio}>
        Actualizar Servicio
      </button>
      <Link to="/Servicio" className="btn btn-secondary">
        Cancelar
      </Link>
    </div>
  );
};
