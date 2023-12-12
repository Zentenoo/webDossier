import { useEffect, useState } from "react";
import axios from 'axios';
import { getAllReserva } from "../../Reserva/helpers/getAllReserva";
import { getAllProducto } from "../../Producto/helpers/getAllProducto";

export const CreateConsumoPage = () => {
    const [reserva, setReserva] = useState([]);
    const [producto, setProducto] = useState([]);
    const [formData, setFormData] = useState({
        estado: true,
        total: 0,
        servicio: '',
        precioServicio:0,
        usuario: '',
        precio:0,
        cantidad:0,
    });
    const getReservas = async () => {
        const data = await getAllReserva();
        setReserva(data);
    }

    const getAllProductos = async () => {
        const data = await getAllProducto();
        setProducto(data);
    }

    useEffect(() => {
        getReservas();
        getAllProductos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [name]: value,
            };
            const subtotal = updatedData.cantidad * updatedData.precio;
            const total = subtotal + updatedData.precioServicio;
            updatedData.total = total;
            return updatedData;
        });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            await axios.post("http://localhost:3000/consumo", {
                "fecha": new Date(),
                "estado": formData.estado,
                "total": formData.total,
                "reservaid": document.getElementById("reserva").value,
            });
            window.location.reload();
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    }

    const handleCancelar = () => {
        getReservas();
    }

    const handleProducto = (e) => {
        const selectedProductoId = e.target.value;
        const selectedProducto = producto.find(r => r.id === parseInt(selectedProductoId));

        setFormData({
            ...formData,
            producto: selectedProductoId,
            precio: selectedProducto ? selectedProducto.precio : '',
        });
    }
    const handleReserva = (e) => {
        const selectedReservaId = e.target.value;
        const selectedReserva = reserva.find(r => r.id === parseInt(selectedReservaId));
        setFormData({
            ...formData,
            reserva: selectedReservaId,
            usuario: selectedReserva ? selectedReserva.nombre_usuario : '',
            servicio: selectedReserva ? selectedReserva.nombre_servicio : '',
            precioServicio: selectedReserva ? selectedReserva.total : '',
        });
    }

    return (
        <div className="container">
            <section className="d-flex justify-content-center ">
                <div className="">
                    <div className="mb-2">
                        <form onSubmit={onSubmit} action="">
                            <div className="mb-3">
                                <div className="mb-3">
                                    <label htmlFor="reserva" className="form-label">Reserva </label>
                                    <select
                                        id="reserva"
                                        name="reserva"
                                        className='form-select'
                                        onChange={handleReserva}
                                    >
                                        {reserva.map(reserva =>
                                            <option key={reserva.id} value={reserva.id} className="form-control"> {reserva.id} </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="usuario" className="form-label">Usuario</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="usuario"
                                    name="usuario"
                                    value={formData.usuario}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="servicio" className="form-label">Servicio</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="servicio"
                                    name="servicio"
                                    value={formData.servicio}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precioServicio" className="form-label">Precio Servicio</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="precioServicio"
                                    name="precioServicio"
                                    value={formData.precioServicio}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <div className="mb-3">
                                    <label htmlFor="producto" className="form-label">Producto </label>
                                    <select
                                        id="producto"
                                        name="producto"
                                        className='form-select'
                                        onChange={handleProducto}
                                    >
                                        {producto.map(producto =>
                                            <option key={producto.id} value={producto.id} className="form-control"> {producto.nombre} </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precio" className="form-label">Precio Unit</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="precio"
                                    name="precio"
                                    value={formData.precio}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cantidad" className="form-label">Cantidad</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="cantidad"
                                    name="cantidad"
                                    value={formData.cantidad}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subtotal" className="form-label">Subtotal</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="subtotal"
                                    name="subtotal"
                                    value={`${formData.cantidad*formData.precio} Bs.`}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor='estado' className="form-label">Estado</label>
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
                            </div> */}
                            <div className="mb-3" style={{color: 'green'}}>
                                <label htmlFor="total" className="form-label">Total</label>
                                <input
                                    className="form-control"
                                    style={{color: 'green'}}
                                    type="text"
                                    id="total"
                                    name="total"
                                    value={`${formData.total} Bs.`}
                                    onChange={handleChange}
                                    readOnly
                                />
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
