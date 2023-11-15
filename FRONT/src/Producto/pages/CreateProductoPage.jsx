import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const CreateProductoPage = () => {
    const [formData, setFormData] = useState({
        strNombre: '',
        strDescripcion: '',
        intPrecio: 0,
        intStock: 0,
        boolEstado: true,
        strFoto: '',
    });

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
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/producto", {
                "nombre": formData.strNombre,
                "descripcion": formData.strDescripcion,
                "precio": formData.intPrecio,
                "stock": formData.intStock,
                "estado": formData.boolEstado,
                "foto": formData.strFoto,
            });
            window.location.href = "/producto";
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

    return (
        <div className="container mt-10">
            <section className="d-flex justify-content-center ">
                <div className="card col-sm-6 p-3">
                    <div className="mb-3">
                        <h4>Crear Producto</h4>
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
                            <div className="mb-3">
                                <label htmlFor="intPrecio" className="form-label">Precio</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="intPrecio"
                                    name="intPrecio"
                                    value={formData.intPrecio}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="intStock" className="form-label">Stock</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="intStock"
                                    name="intStock"
                                    value={formData.intStock}
                                    onChange={handleChange}
                                    required
                                    min="0"
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
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-primary" type="submit">Agregar</button>
                                <Link to="/producto" className="btn btn-secondary">Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};
