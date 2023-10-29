import { useEffect, useState } from "react"
import axios from 'axios'
import { getAllTipoPlato } from "../../TipoPlato/helpers/getAllTipoPlato";
import { Link } from 'react-router-dom';

export const CreatePlatoPage = () => {
    const [tipoPlato, setTipoPlato] = useState([]);

    const getTipoPlatos = async () => {
        const data=await getAllTipoPlato();
        setTipoPlato(data);
    }

    useEffect(() => {
      getTipoPlatos();  
    },[])


    const onSubmit =async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/plato", {
            "nombre": document.getElementById("strNombre").value,
            "descripcion": document.getElementById("strDescripcion").value,
            "estado": document.getElementById("boolEstado").value,
            "foto": document.getElementById("strFoto").value,
            "tipoPlatoId": document.getElementById("strTipoPlatoId").value,
        })
        window.location.href = "/plato";
    }
    return (
        <div className="container mt-10">
            <section className="d-flex justify-content-center ">
                <div className="card col-sm-6 p-3">
                    <div className="mb-3">
                        <h4>Crear Plato</h4>
                    </div>
                    <div className="mb-2">
                        <form onSubmit={onSubmit} action="">
                            <div className="mb-3">
                                <label htmlFor="strNombre" className="form-label">Nombre</label>
                                <input className="form-control" type="text" id="strNombre" name="strNombre" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="strDescripcion" className="form-label">Descripción</label>
                                <input className="form-control" type="text" id="strDescripcion" name="strDescripcion" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="strFoto" className="form-label">Foto</label>
                                <input className="form-control" type="text" id="strFoto" name="strFoto" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor='boolEstado' className="form-label">Estado: </label>
                                <select id='boolEstado' name='boolEstado' defaultValue="Activo" className="form-select">
                                    <option value={true}>Activo</option>
                                    <option value={false}>Inactivo</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-evenly">
                                <div className="mb-3">
                                    <label htmlFor="strTipoPlatoId" className="form-label">Tipo: </label>
                                    <select id="strTipoPlatoId" className='form-select-sm'>
                                        {tipoPlato.map(tipoPlato =>
                                            <option key={tipoPlato.id} value={tipoPlato.id}> {tipoPlato.nombre} </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-primary"  type="submit">Agregar</button>
                                <Link to="/plato" className="btn btn-secondary">Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}