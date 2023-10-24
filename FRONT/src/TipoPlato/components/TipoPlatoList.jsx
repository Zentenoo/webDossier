import { getAllTipoPlato } from "../helpers/getAllTipoPlato"
import {  useEffect, useState } from "react"

export const TipoPlatoList=()=>{
    const [tipoPlato, setTipoPlato] = useState([]);
    const getListTipoPlato = async()=> {
        const data = await getAllTipoPlato();
        if (data == "error") {
            navigate(`../../`);
        }else {
            setTipoPlato(data);
        }
    };

    useEffect(() => {
        getListTipoPlato();
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
                        {tipoPlato.map(plato => 
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