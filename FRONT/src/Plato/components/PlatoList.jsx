import { useEffect, useState } from "react"
import { getAllPlato } from "../helpers/getAllPlato";
import { useNavigate } from "react-router-dom";
import { deletePlato } from "../helpers/deletePlato";
export const PlatoList = () => {
    const [plato, setPlato] = useState([]);

    const navigate = useNavigate()
    const getListPlato = async () => {
        const data = await getAllPlato();
        if (data == "error") {
            navigate(`../../`);
        } else {
            setPlato(data);
        }
    };
    useEffect(() => {
        getListPlato();
    }, [])


    const eliminar = async (id) => {
        await deletePlato(id);
        getListPlato();
    }

    return (
        <div className="container">
            <div className="row">
                {plato.map(plato => (
                    <div className="col-lg-4 mb-4" key={plato.id}>
                        <div className="card">
                            <img src={plato.foto} className="card-img-top" style={{ width: "100%", height: "200px", objectFit: "cover" }} alt={plato.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{plato.nombre}</h5>
                                <p className="card-text">{plato.descripcion}</p>
                                <p className="card-text">Tipo de Plato: {plato.tipoplato}</p>
                                <p className="card-text">
                                    Estado: {plato.estado ? <i className="bi bi-check-circle"></i> : <i className="bi bi-x-circle"></i>}
                                </p>
                                <div className="d-flex justify-content-between">
                                    <a onClick={() => navigate(`/plato/${plato.id}`)} className="btn btn-primary"><i className="bi bi-pencil-square"></i> Editar</a>
                                    <button onClick={async () => await eliminar(plato.id)} type="button" className="btn btn-danger"><i className="bi bi-trash"></i> Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


