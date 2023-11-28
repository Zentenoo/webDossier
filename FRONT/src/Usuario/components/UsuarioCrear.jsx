import { Link } from "react-router-dom";
import { createUsuario } from "../helpers/petUsuario";
import { useEffect, useState } from "react";
export const UsuarioCrear = () => {
    const [usuarioData, setUsuarioData] = useState({
        nombre: "",
        contraseña: "",
        apellido: "",
        telefono: "",
        correo: "",
        foto: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuarioData({
            ...usuarioData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createUsuario(usuarioData);
            window.location.href = "/usuario";
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target.result;
                setUsuarioData({
                    ...usuarioData,
                    foto: base64String,
                });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleCancelar = () => {
        window.location.href = "/usuario";
    }
    return (
        <div className="container">
            <section className="d-flex justify-content-center">
                <div>
                    <div className="mb-2">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={usuarioData.nombre}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="contraseña" className="form-label">Contraseña:</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    id="contraseña"
                                    name="contraseña"
                                    value={usuarioData.contraseña}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="apellido" className="form-label">Apellido:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    value={usuarioData.apellido}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label">Teléfono:</label>
                                <input
                                    className="form-control"
                                    type="tel"
                                    id="telefono"
                                    name="telefono"
                                    value={usuarioData.telefono}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label">Correo:</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    id="correo"
                                    name="correo"
                                    value={usuarioData.correo}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="foto" className="form-label">Seleccionar Foto:</label>
                                <input
                                className="form-control"
                                    type="file"
                                    id="foto"
                                    name="foto"
                                    onChange={handleFileChange}
                                    accept="image/*"
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
    )
}