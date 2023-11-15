import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { getAllTipoPlato } from "../../TipoPlato/helpers/getAllTipoPlato";
import { getPlato } from "../helpers/getPlato";

export const EditPlato = () => {
    const [tipoPlato, setTipoPlato] = useState([]);
    const [formData, setFormData] = useState({
        strNombre: '',
        strDescripcion: '',
        strFoto: '',
        boolEstado: true,
    });
    const params = useParams();
    const getTipoPlatos = async () => {
        try {
            const data = await getAllTipoPlato();
            setTipoPlato(data);
        } catch (error) {
            console.error("Error al obtener los tipos de plato:", error);
        }
    };

    const getPlatoData = async (id) => {
        try {
            const data = await getPlato(id);
            return data;
        } catch (error) {
            console.error("Error al obtener los datos del plato:", error);
        }
    };

    useEffect(() => {
        getTipoPlatos();
        getPlatoData(params.id).then((data) => {
            setFormData({
                strNombre: data.nombre,
                strDescripcion: data.descripcion,
                strFoto: data.foto,
                boolEstado: data.estado,
            });
        });
    }, [params.id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target.result;
                setFormData({
                    ...formData,
                    strFoto: base64String,
                });
            };
            reader.readAsDataURL(file);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar datos al servidor
            await axios.put(`http://localhost:3000/plato/${params.id}`, {
                nombre: formData.strNombre,
                descripcion: formData.strDescripcion,
                estado: formData.boolEstado,
                foto: formData.strFoto,
                "tipoPlatoId": document.getElementById("strTipoPlatoId").value,
            });

            // Navegar de vuelta a la lista de platos
            window.location.href = "/plato";
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            // Manejar el error (por ejemplo, mostrar un mensaje al usuario)
        }
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
                                    value={formData.strNombre}
                                    onChange={handleChange}
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
                                    value={formData.strDescripcion}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="foto" class="form-label">Foto Nueva</label>
                                <input
                                    class="form-control"
                                    type="file"
                                    id="foto"
                                    name="foto"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                            {formData.strFoto && (
                                <div className="mb-3">
                                    <label className="form-label">Foto Actual: </label>
                                    <img
                                        src={formData.strFoto}
                                        alt="Foto Actual"
                                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                                    />
                                </div>
                            )}
                            <div className="mb-3">
                                <label htmlFor='boolEstado' className="form-label">Estado: </label>
                                <select
                                    id='boolEstado'
                                    name='boolEstado'
                                    value={formData.boolEstado}
                                    onChange={handleChange}
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
