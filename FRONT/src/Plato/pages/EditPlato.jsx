import { useEffect, useState } from "react";
import axios from 'axios';
import { getAllTipoPlato } from "../../TipoPlato/helpers/getAllTipoPlato";
import { Link, useParams } from 'react-router-dom';
import { getPlato } from "../helpers/getPlato";

export const EditPlato = () => {

    const [tipoPlato, setTipoPlato] = useState([]);
    const params = useParams();
    const getTipoPlatos = async () => {
        const data = await getAllTipoPlato();
        setTipoPlato(data);
    };

    const getListPlato = async (id) => {
        const data = await getPlato(id);
        return data;
    };



    useEffect(() => {
        getTipoPlatos();
        getListPlato(params.id)
            .then((data) => {
                document.getElementById("strNombre").value = data.nombre;
                document.getElementById("strDescripcion").value = data.descripcion;
                document.getElementById("strFoto").value = data.foto;
                document.getElementById("boolEstado").value = data.estado;
                const tipoPlatoEncontrado = tipoPlato.find((tipoPlato) => tipoPlato.id === data.tipoplatoid);
                if (tipoPlatoEncontrado) {
                    document.getElementById("strTipoPlatoId").value = tipoPlatoEncontrado.id;
                }
            });
    }, [params.id]);


    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3000/plato/${params.id}`, {
            "nombre": document.getElementById("strNombre").value,
            "descripcion": document.getElementById("strDescripcion").value,
            "estado": document.getElementById("boolEstado").value,
            "foto": document.getElementById("strFoto").value,
            "tipoPlatoId": document.getElementById("strTipoPlatoId").value,
        });
        window.location.href = "/plato";
    };


    return (
        <div className="container mt-10">
            <section className="d-flex justify-content-center">
                <div className="card col-sm-6 p-3">
                    <div className="mb-3">
                        <h4>Editar Plato</h4>
                    </div>
                    <div className="mb-2">
                        <form onSubmit={onSubmit} action="">
                            <div className="mb-3">
                                <label htmlFor="strNombre" className="form-label">Nombre</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="strNombre"
                                    name="strNombre"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="strDescripcion" className="form-label">Descripción</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="strDescripcion"
                                    name="strDescripcion"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="strFoto" className="form-label">Foto</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="strFoto"
                                    name="strFoto"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor='boolEstado' className="form-label">Estado: </label>
                                <select
                                    id='boolEstado'
                                    name='boolEstado'
                                    className="form-select"
                                >
                                    <option value={true}>Activo</option>
                                    <option value={false}>Inactivo</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-evenly">
                                {tipoPlato.length > 0 && (
                                    <div className="mb-3">
                                        <label htmlFor="strTipoPlatoId" className="form-label">Tipo: </label>
                                        <select
                                            id="strTipoPlatoId"
                                            name="strTipoPlatoId"
                                            className='form-select-sm'
                                        >
                                            {tipoPlato.map(tipoPlato =>
                                                <option key={tipoPlato.id} value={tipoPlato.id}> {tipoPlato.nombre} </option>
                                            )}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="d-flex justify-content-between">
                                <button className="btn btn-primary" type="submit">Editar</button>
                                <Link to="/plato" className="btn btn-secondary">Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};
