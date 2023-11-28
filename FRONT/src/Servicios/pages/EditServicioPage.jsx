import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getServicioById } from "../helpers/helpergeServicioById";
import { editServicio } from "../helpers/helpereditServicio";

export const EditServicioPage = () => {
  const { id } = useParams();
  const [servicio, setServicio] = useState({});
  const [error, setError] = useState("");

  const getServicioWithFechasById = (id) => {
    return fetch(`http://localhost:3000/servicio/${id}`).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return "error";
      }
    });
  };

useEffect(() => {
  getServicioWithFechasById(id).then((data) => {
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
    const success = await editServicio(
      id, // Pasa el ID del servicio que deseas editar
      servicio.nombre, // Pasa los valores actuales de servicio
      servicio.descripcion,
      servicio.fechaInicio,
      servicio.fechaFin,
      servicio.cupo,
      servicio.precio,
      servicio.estado,
      servicio.foto
    );

    if (success) {
      // Redirige a la página de lista de servicios después de la actualización
      window.location.href = "/servicios";
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
          name="nombre" // Agrega el atributo "name" para identificar el campo
          className="form-control"
          value={servicio.nombre || ""} // Usa servicio.nombre o cadena vacía por defecto
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          className="form-control"
          value={servicio.descripcion || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaInicio">Fecha Inicio:</label>
        <input
          type="date"
          id="fechaInicio"
          name="fechaInicio"
          className="form-control"
          value={servicio.fechaInicio || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaFin">Fecha Fin:</label>
        <input
          type="date"
          id="fechaFin"
          name="fechaFin"
          className="form-control"
          value={servicio.fechaFin || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cupo">Cupo:</label>
        <input
          type="number"
          id="cupo"
          name="cupo"
          className="form-control"
          value={servicio.cupo || 0}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          name="precio"
          className="form-control"
          value={servicio.precio || ""}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            name="estado"
            className="form-control"
            value={servicio.estado || false}
            onChange={handleChange}
          >
            <option value={false}>No Visible</option>
            <option value={true}>Visible</option>
          </select>
        </div>
      <button className="btn btn-primary" onClick={handleUpdateServicio}>
        Actualizar Servicio
      </button>
      <Link to="/servicios" className="btn btn-secondary">
        Cancelar
      </Link>
    </div>
  );
};
