import { getAllPlato } from "../helpers/getAllPlato"
import {  useState } from "react"

export const PlatosList=()=>{
    const [platos, setPlato] = useState([]);
    const getListPlato = async()=> {
        const data = await getAllPlato();
        if (data == "error") {
            navigate(`../../`);
        }else {
            setPlato(data);
        }
    };

    return (
        <div>
            <h1>Plato</h1>
            <button onClick={getListPlato}>Get All Platos</button>
            <ul>
                {platos.map((plato)=>(
                    <div>
                        <li key={plato.id}>{plato.nombre}</li>
                        <li key={plato.id}>{plato.descripcion}</li>
                    </div>
                ))}
            </ul>
        </div>
    )
}