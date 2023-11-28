import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllServicios } from "../helpers/getAllServicios";
import { deleteServicio } from "../helpers/helperdeleteServicio";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import format from 'date-fns/format';
import esLocale from 'date-fns/locale/es';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ServicioList = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1); // Suma un día para corregir la diferencia

    return format(date, 'dd MMMM', { locale: esLocale });
  };

  const [servicios, setServicio] = useState([]);

  const sortAndSetServicios = (data) => {
    const serviciosFormateados = data.map((servicio) => ({
      ...servicio,
      fechaInicio: formatDate(servicio.fechaInicio),
      fechaFin: formatDate(servicio.fechaFin),
      mes: new Date(servicio.fechaInicio).getMonth(),
    }));

    // Ordenar los servicios por mes de menor a mayor
    serviciosFormateados.sort((a, b) => a.mes - b.mes);

    setServicio(serviciosFormateados);
  };

  const getListServicio = async () => {
    const data = await getAllServicios();
    if (data === "error") {
      return <Link to="../../">Volver a la página principal</Link>;
    } else {
      sortAndSetServicios(data);
    }
  };

  useEffect(() => {
    getListServicio();
  }, []);
  


  const handleDelete = async (id, nombre) => {
    const success = await deleteServicio(id);
    if (success) {
      getListServicio();
      toast.success(`Servicio "${nombre}" eliminado con éxito`, {
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
      console.error("Failed to delete Servicio with ID: ", id);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <br />
      <div className="row">
        {servicios.map((servicio) => (
          <div className="col-md-3 mb-4" key={servicio.id}>
            <div className="card" style={{ height: "100%" }}>
              <div className="card-header bg-danger text-white" style={{ textAlign: 'center', fontSize: '15px' }}>
                <strong>{servicio.fechaInicio} | {servicio.fechaFin}</strong>
              </div>
              <img src={servicio.foto} className="card-img-top" alt={servicio.nombre} style={{ objectFit: 'cover', height: '200px' }} />
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <h4 className="card-title font-weight-bold">{servicio.nombre}</h4>
                <p className="card-text small" style={{ fontSize: '10px' }}>{servicio.descripcion}</p>
                <hr />
                <p className="card-text small">Cupos: <strong style={{ fontSize: '17px', color: 'green' }}>{servicio.cupo}</strong></p>
                <p className="card-text small">Precio: {servicio.precio}Bs</p>
                <p className="card-text small">
                  Estado: {servicio.estado ? <i className="bi bi-check-circle"></i> : <i className="bi bi-x-circle"></i>}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to={`/servicios/edit/${servicio.id}`} className="btn btn-primary small">
                    <FaEdit /> Editar
                  </Link>
                  <div>
                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#exampleModal${servicio.id}`}>
                      <i className="bi bi-trash"></i> Eliminar
                    </button>
                    <div className="modal fade" id={`exampleModal${servicio.id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${servicio.id}`} aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id={`exampleModalLabel${servicio.id}`}>Desea eliminar el servicio "{servicio.nombre}"?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-header d-flex justify-content-between">
                            <button onClick={() => handleDelete(servicio.id, servicio.nombre)} type="button" className="btn btn-danger small" data-bs-dismiss="modal">
                              <i className="bi bi-trash"></i> Eliminar
                            </button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
