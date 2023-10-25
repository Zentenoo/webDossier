import { useEffect, useState } from "react"
import { getAllPlato } from "../helpers/getAllPlato";
import { useNavigate } from "react-router-dom";
export const PlatoList = () => {
    const [plato, setPlato] = useState([]);
    const navigate=useNavigate()
    const getListPlato = async () => {
        const data = await getAllPlato();
        if (data == "error") {
            navigate(`../../`);
        }else {
            setPlato(data);
        }
    };

    useEffect(() => {
        getListPlato();
    },[])

    return (
        <div class="container">
                <h1>Lista de Platos</h1>
                <hr></hr>
                <table class="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descipción</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Foto</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            </tr>
                    </thead>
                    <tbody>
                        {platos.map(prenda => 
                            <tr key={prenda.id}>
                                <td>{prenda.id}</td>
                                <td>{prenda.nombre}</td>
                                <td>{prenda.descripcion}</td>
                                <td>{prenda.estado}</td>
                                <td>{prenda.foto}</td>
                                <td><a onClick={() => navigate(`/prenda/${prenda.id}`)} className="btn btn-primary"><i class="bi bi-pencil-square"></i></a></td>
                                <td><button onClick={()=>eliminar(prenda.id)} type="button" className="btn btn-danger"><i class="bi bi-trash"></i></button></td>
                            </tr>
                            )}
                        
                    </tbody>
                </table>
            </div>
    )
}