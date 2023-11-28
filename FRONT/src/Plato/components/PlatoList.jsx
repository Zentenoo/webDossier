import { useEffect, useState } from "react";
import { getAllPlato } from "../helpers/getAllPlato";
import { useNavigate } from "react-router-dom";
import { deletePlato } from "../helpers/deletePlato";
import { EditPlato } from "../pages/EditPlato";

export const PlatoList = () => {
    const [plato, setPlato] = useState([]);
    const navigate = useNavigate();

    const getListPlato = async () => {
        const data = await getAllPlato();
        if (data === "error") {
            navigate(`../../`);
        } else {
            setPlato(data);
        }
    };

    useEffect(() => {
        getListPlato();
    }, []);

    const eliminar = async (id) => {
        await deletePlato(id);
        getListPlato();
    };

    return (
        <div className="container">
            <div className="row">
                {plato.map((plato) => (
                    <div className="col-lg-4 mb-4" key={plato.id}>
                        <div className="card">
                            <img
                                src={plato.foto}
                                className="card-img-top"
                                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                alt={plato.nombre}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{plato.nombre}</h5>
                                <p className="card-text">{plato.descripcion}</p>
                                <p className="card-text">Tipo de Plato: {plato.tipoplato}</p>
                                <p className="card-text">
                                    Estado: {plato.estado ? <i className="bi bi-check-circle"></i> : <i className="bi bi-x-circle"></i>}
                                </p>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModalLabel${plato.id}e`}>
                                            <i className="bi bi-pencil-square"></i> Editar
                                        </button>
                                        <div className="modal fade" id={`exampleModalLabel${plato.id}e`} tabIndex="-1" aria-labelledby={`#exampleModalLabel${plato.id}e`} aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id={`exampleModalLabel${plato.id}e`} style={{ color: "black" }}>Editar Plato "{plato.nombre}"?</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-header d-flex justify-content-between">
                                                        <EditPlato plato={plato}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#exampleModal${plato.id}`}>
                                            <i className="bi bi-trash"></i> Eliminar
                                        </button>
                                        <div className="modal fade" id={`exampleModal${plato.id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${plato.id}`} aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id={`exampleModalLabel${plato.id}`}>Desea eliminar el plato "{plato.nombre}"?</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-header d-flex justify-content-between">
                                                        <button onClick={async () => await eliminar(plato.id)} type="button" className="btn btn-danger" data-bs-dismiss="modal">
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
