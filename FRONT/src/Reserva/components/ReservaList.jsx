import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllReserva } from "../helpers/getAllReserva";
import { EditReservaPage } from "./EditReservaPage";

export const ReservaList = () => {
    const [reserva, setReserva] = useState([]);
    const navigate = useNavigate();
    console.log(reserva)
    const getListReserva = async () => {
        const data = await getAllReserva();
        if (data === "error") {
            navigate(`../../`);
        } else {
            setReserva(data);
        }
    };

    useEffect(() => {
        getListReserva();
    }, []);

    return (
        <div className="container">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">FechaReserva</th>
                <th scope="col">FechaServicio</th>
                <th scope="col">Cupo</th>
                <th scope="col">Obervacion</th>
                <th scope="col">Estado</th>
                <th scope="col">Total</th>
                <th scope="col">Usuario</th>
                <th scope="col">Servicio</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {reserva.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.fechareserva}</td>
                  <td>{reserva.fechaservicio}</td>
                  <td>{reserva.cupo}</td>
                  <td>{reserva.observacion}</td>
                  <td className="color-red">{reserva.estado ? "Confirmada" : "Cancelada"}</td>
                  <td>{reserva.total}</td>
                  <td>{reserva.nombre_usuario}</td>
                  <td>{reserva.nombre_servicio}</td>

                  <td>
                    {/* <Link to={`/tipo_plato/edit/${reserva.id}`} className="btn btn-primary">
                      <i className="bi bi-pencil-square"></i>
                    </Link> */}
                    <div>
                      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModalLabel${reserva.id}e`}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <div className="modal fade" id={`exampleModalLabel${reserva.id}e`} tabIndex="-1" aria-labelledby={`#exampleModalLabel${reserva.id}e`} aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id={`exampleModalLabel${reserva.id}e`} style={{ color: "black" }}>Editar reserva de "{reserva.nombre_usuario}" para Servicio: "{reserva.nombre_servicio}"?</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-header d-flex justify-content-between">
                              <EditReservaPage reserva={reserva} />
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
