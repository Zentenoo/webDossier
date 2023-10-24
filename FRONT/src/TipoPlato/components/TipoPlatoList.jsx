import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTipoPlato } from "../helpers/getAllTipoPlato";
import { deleteTipoPlato } from "../helpers/helperdeleteTipoPlato";

export const TipoPlatoList = () => {
  const [tipoPlatos, setTipoPlato] = useState([]);

  const getListPlato = async () => {
    const data = await getAllTipoPlato();
    if (data === "error") {
      // Utiliza el componente Link para la navegación
      return <Link to="../../">Volver a la página principal</Link>;
    } else {
      setTipoPlato(data);
    }
  };

  useEffect(() => {
    getListPlato();
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteTipoPlato(id);
    if (success) {
      // Si la eliminación es exitosa, actualiza la lista de tipos de plato
      getListPlato(); // Recarga la lista después de la eliminación exitosa
    } else {
      // Maneja el fallo de eliminación (por ejemplo, muestra un mensaje de error)
      console.error("Failed to delete TipoPlato with ID: ", id);
    }
  };

  return (
    <div className="container">
      <h1>Lista de Tipo de Plato</h1>
      <hr></hr>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {tipoPlatos.map((plato) => (
            <tr key={plato.id}>
              <td>{plato.id}</td>
              <td>{plato.nombre}</td>
              <td>{plato.descripcion}</td>
              <td>
                <Link to={`/tipo_plato/edit/${plato.id}`} className="btn btn-primary">
                  <i className="bi bi-pencil-square"></i>
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(plato.id)} type="button" className="btn btn-danger">
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
