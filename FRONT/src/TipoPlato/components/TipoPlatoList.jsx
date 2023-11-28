import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTipoPlato } from "../helpers/getAllTipoPlato";
import { deleteTipoPlato } from "../helpers/helperdeleteTipoPlato";
import { EditTipoPlatoPage } from "../pages/EditTipoPlatoPage";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

  const handleDelete = async (id,nombre) => {
    const success = await deleteTipoPlato(id);
    if (success) {
      // Si la eliminación es exitosa, actualiza la lista de tipos de plato
      getListPlato(); // Recarga la lista después de la eliminación exitosa
      toast.success(`Tipo de Plato "${nombre}" eliminado con éxito`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      
    } else {
      // Maneja el fallo de eliminación (por ejemplo, muestra un mensaje de error)
      console.error("Failed to delete TipoPlato with ID: ", id);
    }
  };

  return (
    <div>
      <ToastContainer />
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
                {/* <Link to={`/tipo_plato/edit/${plato.id}`} className="btn btn-primary">
                  <i className="bi bi-pencil-square"></i>
                </Link> */}
                <div>
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModalLabel${plato.id}e`}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <div className="modal fade" id={`exampleModalLabel${plato.id}e`} tabIndex="-1" aria-labelledby={`#exampleModalLabel${plato.id}e`} aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id={`exampleModalLabel${plato.id}e`} style={{ color: "black" }}>Editar Tipo de Plato "{plato.nombre}"?</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-header d-flex justify-content-between">
                          <EditTipoPlatoPage idtipo={plato.id} descripciontipo={plato.descripcion} nombretipo={plato.nombre}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#exampleModalLabel${plato.id}`}>
                    <i className="bi bi-trash"></i>
                  </button>
                  <div className="modal fade" id={`exampleModalLabel${plato.id}`} tabIndex="-1" aria-labelledby={`#exampleModalLabel${plato.id}`} aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id={`exampleModalLabel${plato.id}`} style={{ color: "black" }}>Desea eliminar el Tipo de Plato "{plato.nombre}"?</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-header d-flex justify-content-between">
                          <button onClick={() => handleDelete(plato.id,plato.nombre)} type="button" class="btn btn-danger" data-bs-dismiss="modal"><i className="bi bi-trash"></i> Eliminar</button>
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