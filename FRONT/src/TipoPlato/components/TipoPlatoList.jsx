import { getAllTipoPlato } from "../helpers/getAllTipoPlato"
import {  useEffect, useState } from "react"

export const TipoPlatoList=()=>{
    const [tipoPlatos, setTipoPlato] = useState([]);
    const getListPlato = async()=> {
        const data = await getAllTipoPlato();
        if (data == "error") {
            navigate(`../../`);
        }else {
            setTipoPlato(data);
        }
    };

    useEffect(() => {
        getListPlato();
    },[])

    return (
        <div class="container">
                <h1>Lista de Tipo de Plato</h1>
                <hr></hr>
                <table class="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descipción</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            </tr>
                    </thead>
                    <tbody>
                        {tipoPlatos.map(plato => 
                            <tr key={plato.id}>
                                <td>{plato.id}</td>
                                <td>{plato.nombre}</td>
                                <td>{plato.descripcion}</td>
                                <td><a onClick={() => navigate(`/plato/${plato.id}`)} className="btn btn-primary"><i class="bi bi-pencil-square"></i></a></td>
                                <td><button onClick={()=>eliminar(plato.id)} type="button" className="btn btn-danger"><i class="bi bi-trash"></i></button></td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>
            </div>
    )
}