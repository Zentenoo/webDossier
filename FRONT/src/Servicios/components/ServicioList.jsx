import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllServicios } from "../helpers/getAllServicios";
import { deleteServicio } from "../helpers/helperdeleteServicio";

export const ServicioList = () => {
  const [servicios, setServicio] = useState([]);

  const getListServicio = async () => {
    const data = await getAllServicios();
    if (data === "error") {
      // Utiliza el componente Link para la navegación
      return <Link to="../../">Volver a la página principal</Link>;
    } else {
      setServicio(data);
    }
  };

  useEffect(() => {
    getListServicio();
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteServicio(id);
    if (success) {
      // Si la eliminación es exitosa, actualiza la lista de servicios
      getListServicio(); // Recarga la lista después de la eliminación exitosa
    } else {
      // Maneja el fallo de eliminación (por ejemplo, muestra un mensaje de error)
      console.error("Failed to delete Servicio with ID: ", id);
    }
  };

  return (
    <div className="container">
    <h1>Lista de Servicios</h1>
    <hr></hr>
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripción</th>
          <th scope="col">Fecha Inicio</th>
          <th scope="col">Fecha Fin</th>
          <th scope="col">Cupo</th>
          <th scope="col">Precio</th>
          <th scope="col">Foto</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {servicios.map((servicio) => (
          <tr key={servicio.id}>
            <td>{servicio.id}</td>
            <td>{servicio.nombre}</td>
            <td>{servicio.descripcion}</td>
            <td>{servicio.fechaInicio}</td>
            <td>{servicio.fechaFin}</td>
            <td>{servicio.cupo}</td>
            <td>{servicio.precio}</td>
            <td>
              <img src={servicio.foto} alt={servicio.nombre} width="200" />
            </td>
            <td>
              <Link to={`/servicio/edit/${servicio.id}`} className="btn btn-primary">
                <i className="bi bi-pencil-square"></i>
              </Link>
            </td>
            <td>
              <button onClick={() => handleDelete(servicio.id)} type="button" className="btn btn-danger">
                <i className="bi bi-trash"></i>
              </button>
            </td>
            <td>
            <Link to={`/servicio/add/${servicio.id}`} className="btn btn-success">
              <i className="bi bi-plus-circle"  />
              </Link>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};
