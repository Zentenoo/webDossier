import { useEffect, useState } from "react"
import { getAllProducto } from "../helpers/getAllProducto";
import { useNavigate } from "react-router-dom";
import { deleteProducto } from "../helpers/deleteProducto";
export const ProductoList = () => {
    const [producto, setProducto] = useState([]);

    const navigate = useNavigate()
    const getListProducto = async () => {
        const data = await getAllProducto();
        if (data == "error") {
            navigate(`../../`);
        } else {
            setProducto(data);
        }
    };
    useEffect(() => {
        getListProducto();
    }, [])


    const eliminar = async (id) => {
        await deleteProducto(id);
        getListProducto();
    }

    return (
        <div className="container">
            <div className="row">
                {producto.map(producto => (
                    <div className="col-lg-4 mb-4" key={producto.id}>
                        <div className="card">
                            <img src={producto.foto} className="card-img-top" style={{ width: "100%", height: "200px", objectFit: "cover" }} alt={producto.nombre} />
                            <div className="card-body">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">{producto.descripcion}</p>
                                <p className="card-text">Precio: {producto.precio}</p>
                                <p className="card-text">Stock: {producto.stock}</p>
                                <p className="card-text">
                                    Estado: {producto.estado ? <i className="bi bi-check-circle"></i> : <i className="bi bi-x-circle"></i>}
                                </p>
                                <div className="d-flex justify-content-between">
                                    <a onClick={() => navigate(`/producto/${producto.id}`)} className="btn btn-primary"><i className="bi bi-pencil-square"></i> Editar</a>
                                    <div>
                                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#exampleModal${producto.id}`}>
                                            <i className="bi bi-trash"></i> Eliminar
                                        </button>
                                        <div className="modal fade" id={`exampleModal${producto.id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${producto.id}`} aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id={`exampleModalLabel${producto.id}`}>Desea eliminar el producto "{producto.nombre}"?</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-header d-flex justify-content-between">
                                                        <button onClick={async () => await eliminar(producto.id)} type="button" className="btn btn-danger" data-bs-dismiss="modal">
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
    )
}


