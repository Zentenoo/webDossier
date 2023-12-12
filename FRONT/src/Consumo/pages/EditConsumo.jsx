import { useEffect, useState } from "react";
import axios from 'axios';
import { getAllReserva } from "../../Reserva/helpers/getAllReserva";
import { getAllProducto } from "../../Producto/helpers/getAllProducto";

export const EditConsumo = ({ consumo }) => {
    const [reserva, setReserva] = useState([]);
    const [producto, setProducto] = useState([]);
    const [formData, setFormData] = useState({
        fecha: "",
        estado: true,
        total: 0,
        reservaid: "",
        nombre_servicio: "",
        correo_usuario: "",
    });

    const getReservas = async () => {
        const data = await getAllReserva();
        setReserva(data);
    }

    const getAllProductos = async () => {
        const data = await getAllProducto();
        setProducto(data);
    }

    const getConsumoData = async () => {
        try {
            const data = await consumo;
            return data;
        } catch (error) {
            console.error("Error al obtener los datos del consumo:", error);
        }
    };

    useEffect(() => {
        getReservas();
        getAllProductos();
        getConsumoData().then((data) => {
            setFormData({
                fecha: data.fecha,
                estado: data.estado,
                total: data.total,
                reservaid: data.reservaid,
                nombre_servicio: data.servicio,
                correo_usuario: data.usuario,
            });
        });
    }, [consumo]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar datos al servidor
            await axios.put(`http://localhost:3000/consumo/${consumo.id}`, {
                fecha: formData.fecha,
                estado: formData.estado,
                total: formData.total,
                reservaid: formData.reservaid,
                servicio: formData.nombre_servicio,
                usuario: formData.correo_usuario,
            });
            window.location.href = "/consumo";
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

    const handleCancelar = () => {
        window.location.href = "/consumo";
    }

    return (
        <div className="container mt-10">
            <section className="d-flex justify-content-center">
                <div>
                    <div className="mb-2">
                        <form onSubmit={onSubmit} action="">
                            <div className="mb-3">
                                <label htmlFor="fecha" className="form-label">Fecha</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="fecha"
                                    name="fecha"
                                    value={formData.fecha}
                                    onChange={handleChange}
                                    required
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="estado" className="form-label">Estado</label>
                                <select
                                    id='estado'
                                    name='estado'
                                    value={formData.estado}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value={true}>Activo</option>
                                    <option value={false}>Inactivo</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="total" className="form-label">Total</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="total"
                                    name="total"
                                    value={formData.total}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reservaid" className="form-label">Reserva ID</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="reservaid"
                                    name="reservaid"
                                    value={formData.reservaid}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nombre_servicio" className="form-label">Nombre del Servicio</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="nombre_servicio"
                                    name="nombre_servicio"
                                    value={formData.nombre_servicio}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="correo_usuario" className="form-label">Correo del Usuario</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="correo_usuario"
                                    name="correo_usuario"
                                    value={formData.correo_usuario}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            {/* Otros campos específicos de consumo */}
                            {/* ... */}
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
