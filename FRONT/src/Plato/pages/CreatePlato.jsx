import { useEffect, useState } from "react";
import axios from 'axios';
import { getAllTipoPlato } from "../../TipoPlato/helpers/getAllTipoPlato";
import { Link } from 'react-router-dom';

export const CreatePlatoPage = () => {
    const [tipoPlato, setTipoPlato] = useState([]);
    const [formData, setFormData] = useState({
        strNombre: '',
        strDescripcion: '',
        strFoto: '',  // Cambiado a una cadena Base64
        boolEstado: true,
    });

    const getTipoPlatos = async () => {
        const data = await getAllTipoPlato();
        setTipoPlato(data);
    }

    useEffect(() => {
        getTipoPlatos();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

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
            await axios.post("http://localhost:3000/plato", {
                "nombre": formData.strNombre,
                "descripcion": formData.strDescripcion,
                "estado": formData.boolEstado,
                "foto": formData.strFoto,
                "tipoPlatoId": document.getElementById("strTipoPlatoId").value,
            });
            window.location.href = "/plato";
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    }

    const handleCancelar = () => {
        window.location.href = "/plato";
    }

    return (
        <div className="container">
            <section className="d-flex justify-content-center ">
                <div className="">
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
                            <div className="mb-3">
                                <label htmlFor="strFoto" className="form-label">Foto</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="strFoto"
                                    name="strFoto"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
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

                            <div className="mb-3">
                                <label htmlFor="strTipoPlatoId" className="form-label">Tipo: </label>
                                <select
                                    id="strTipoPlatoId"
                                    name="strTipoPlatoId"
                                    className='form-select'
                                >
                                    {tipoPlato.map(tipoPlato =>
                                        <option key={tipoPlato.id} value={tipoPlato.id} className="form-control"> {tipoPlato.nombre} </option>
                                    )}
                                </select>
                            </div>

                            <div className="d-flex justify-content-between">
                                <button className="btn btn-primary" type="submit">Agregar</button>
                                <button onClick={handleCancelar} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancelar
                                </button>                            
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
