import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { getAllTipoPlato } from "../../TipoPlato/helpers/getAllTipoPlato";
import { getPlato } from "../helpers/getPlato";

export const EditPlato = ({ plato }) => {
    const [tipoPlato, setTipoPlato] = useState([]);
    const [formData, setFormData] = useState({
        strNombre: "",
        strDescripcion: "",
        strFoto: "",
        boolEstado: true,
        tipoplato: "",
        tipoplatoid: 0,
    });
    // const params = useParams();
    const getTipoPlatos = async () => {
        try {
            const data = await getAllTipoPlato();
            setTipoPlato(data);
        } catch (error) {
            console.error("Error al obtener los tipos de plato:", error);
        }
    };

    const getPlatoData = async () => {
        try {
            const data = await plato;
            return data;
        } catch (error) {
            console.error("Error al obtener los datos del plato:", error);
        }
    };
    useEffect(() => {
        getTipoPlatos();
        getPlatoData().then((data) => {
            setFormData({
                strNombre: data.nombre,
                strDescripcion: data.descripcion,
                strFoto: data.foto,
                boolEstado: data.estado,
                tipoplato: data.tipoplato,
                tipoplatoid: data.tipoplatoid,
            });
        });
    }, [plato]);

    const handleChange = (e) => {
        // console.log(e.target.name,e.target.value);
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
            await axios.put(`http://localhost:3000/plato/${plato.id}`, {
                nombre: formData.strNombre,
                descripcion: formData.strDescripcion,
                estado: formData.boolEstado,
                foto: formData.strFoto,
                tipoPlatoId: parseInt(formData.tipoplatoid, 10),
            });
            window.location.href = "/plato";
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

    const handleCancelar = () => {
        window.location.href = "/plato";
    }

    return (
        <div className="container mt-10">
            <section className="d-flex justify-content-center">
                <div>
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
                                <label htmlFor="foto" className="form-label">Foto Nueva</label>
                                <input
                                    className="form-control"
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
                            {tipoPlato.length > 0 && (
                                <div className="mb-3">
                                    <label htmlFor="tipoplatoid" className="form-label">Tipo: </label>
                                    <select
                                        id="tipoplatoid"
                                        name="tipoplatoid"
                                        className='form-select'
                                        value={formData.tipoplatoid}
                                        onChange={handleChange}
                                    >
                                        {tipoPlato.map(tipoPlato =>
                                            <option key={tipoPlato.id} value={tipoPlato.id}> {tipoPlato.nombre}</option>
                                        )}
                                    </select>
                                </div>
                            )}
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-primary" type="submit">Editar</button>
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
};
