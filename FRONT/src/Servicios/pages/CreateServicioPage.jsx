import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createServicio } from "../helpers/helpercreateServicio";

export const CreateServicioPage = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [cupo, setCupo] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState("");

  const handleCrearServicio = async () => {
    if (nombre.trim() === "" || descripcion.trim() === "") {
      setError("Nombre y descripción son campos obligatorios");
      return;
    }

    const nuevoServicio = {
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
      cupo,
      precio,
      foto: foto ? await convertToBase64(foto) : null,
    };
    const exito = await createServicio(nuevoServicio);

    if (exito) {
      // Redirige a la página de lista de servicios después de la creación
      window.location.href = "/servicios";
    } else {
      setError("Error al crear el servicio");
    }
  };
    // Función para convertir el archivo a Base64
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };

  return (
    <div className="container">
      <h1>Crear Nuevo Servicio</h1>
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
      <div className="form-group">
        <label htmlFor="fechaInicio">Fecha Inicio:</label>
        <input
          type="date"
          id="fechaInicio"
          className="form-control"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaFin">Fecha Fin:</label>
        <input
          type="date"
          id="fechaFin"
          className="form-control"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cupo">Cupo:</label>
        <input
          type="number"
          id="cupo"
          className="form-control"
          value={cupo}
          onChange={(e) => setCupo(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          id="precio"
          className="form-control"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="foto">Foto:</label>
        <input
          type="file"
          id="foto"
          className="form-control"
          onChange={(e) => setFoto(e.target.files[0])}
          accept="image/*"
        />
      </div>
      <button className="btn btn-primary" onClick={handleCrearServicio}>
        Crear Servicio
      </button>
      <Link to="/servicios" className="btn btn-secondary">
        Cancelar
      </Link>
    </div>
  );
};

