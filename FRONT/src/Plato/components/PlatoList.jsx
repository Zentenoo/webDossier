import { useEffect, useState } from "react"
import { getAllPlato } from "../helpers/getAllPlato";
export const PlatoList = () => {
    const [plato, setPlato] = useState([]);
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

    console.log(plato)
    return (
        <div class="container">
            <h1>Lista Plato</h1>
            <hr></hr>
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descipción</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Tipo Plato</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {plato.map(plato =>
                        <tr key={plato.id}>
                            <td>{plato.id}</td>
                            <td>{plato.nombre}</td>
                            <td>{plato.descripcion}</td>
                            {plato.estado ? <td><i class="bi bi-check-circle"></i></td> : <td><i class="bi bi-x-circle"></i></td>}
                            <td><img src={plato.foto} style={{ width: '50px', height: '50px' }} /></td>
                            <td>{plato.tipoplato}</td>
                            <td><a onClick={() => navigate(`/plato/${plato.id}`)} className="btn btn-primary"><i class="bi bi-pencil-square"></i></a></td>
                            <td><button onClick={() => eliminar(plato.id)} type="button" className="btn btn-danger"><i class="bi bi-trash"></i></button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}