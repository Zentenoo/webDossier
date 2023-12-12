import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllConsumo } from "../helpers/getAllConsumo";
import { deleteConsumo } from "../helpers/deleteConsumo";
import { EditConsumo } from "../pages/EditConsumo";

export const ConsumoList = () => {
    const [consumo, setConsumo] = useState([]);
    const navigate = useNavigate();

    const getListConsumo = async () => {
        const data = await getAllConsumo();
        if (data === "error") {
            navigate(`../../`);
        } else {
            setConsumo(data);
        }
    };

    useEffect(() => {
        getListConsumo();
    }, []);

    const eliminar = async (id) => {
        await deleteConsumo(id);
        getListConsumo();
    };

    return (
        <div className="container">
            <div className="row">
                {consumo.map((consumo) => (
                    <div className="col-lg-4 mb-4" key={consumo.id}>
                        <div className="card">
                            <div className="card-header bg-danger text-white" style={{ textAlign: 'center', fontSize: '15px' }}>
                                <strong>{consumo.fecha}</strong>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{consumo.servicio}</h5>
                                <p className="card-title">{consumo.usuario}</p>                                
                                <p className="card-text">{consumo.descripcion}</p>
                                <p className="card-text" style={{ color: 'green' }}>Total: {consumo.total}$</p>
                                <p className="card-text">
                                    Estado: {consumo.estado ? <i className="bi bi-check-circle"></i> : <i className="bi bi-x-circle"></i>}
                                </p>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModalLabel${consumo.id}e`}>
                                            <i className="bi bi-pencil-square"></i> Editar
                                        </button>
                                        <div className="modal fade" id={`exampleModalLabel${consumo.id}e`} tabIndex="-1" aria-labelledby={`#exampleModalLabel${consumo.id}e`} aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id={`exampleModalLabel${consumo.id}e`} style={{ color: "black" }}>Editar Consumo "{consumo.id}"?</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-header d-flex justify-content-between">
                                                        <EditConsumo consumo={consumo}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#exampleModal${consumo.id}`}>
                                            <i className="bi bi-trash"></i> Eliminar
                                        </button>
                                        <div className="modal fade" id={`exampleModal${consumo.id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${consumo.id}`} aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id={`exampleModalLabel${consumo.id}`}>Desea eliminar el consumo "{consumo.id}"?</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-header d-flex justify-content-between">
                                                        <button onClick={async () => await eliminar(consumo.id)} type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                                            <i className="bi bi-trash"></i> Eliminar
                                                        </button>
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                            Cancelar
                                                        </button>
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
