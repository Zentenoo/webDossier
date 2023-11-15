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
    <div>
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
                <div>
                  <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#exampleModalLabel${plato.id}`}>
                    <i className="bi bi-trash"></i>
                  </button>
                  <div class="modal fade" id={`exampleModalLabel${plato.id}`} tabIndex="-1" aria-labelledby={`#exampleModalLabel${plato.id}`} aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id={`exampleModalLabel${plato.id}`} style={{ color: "black" }}>Desea eliminar el Tipo de Plato "{plato.nombre}"?</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-header d-flex justify-content-between">
                          <button onClick={() => handleDelete(plato.id)} type="button" class="btn btn-danger" data-bs-dismiss="modal"><i className="bi bi-trash"></i> Eliminar</button>
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
