import { useEffect, useState } from "react";
import axios from 'axios';

export const UsuarioActualizar = ({ usuario }) => {
    const [usuarioData, setUsuarioData] = useState({
        Nombre: "",
        Contraseña: "",
        Apellido: "",
        Telefono: "",
        Correo: "",
        Estado: true,
        Esadmin: false,
        Esanfitrion: false,
        Foto: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setUsuarioData({
                    ...usuarioData,
                    Nombre: usuario.Nombre,
                    Contraseña: usuario.Contraseña,
                    Apellido: usuario.Apellido,
                    Telefono: usuario.Telefono,
                    Correo: usuario.Correo,
                    Estado: usuario.Estado,
                    Esadmin: usuario.Esadmin,
                    Esanfitrion: usuario.Esanfitrion,
                    Foto: usuario.Foto
                });
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };
        fetchData();
    }, [usuario]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/usuario/${usuario.id}`, usuarioData);

            window.location.href = "/usuario";
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuarioData({
            ...usuarioData,
            [name]: value,
        });
    }
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
        <div className="container mt-10">
            <section className="d-flex justify-content-center">
                <div>
                    <div className="mb-2">
                        <form onSubmit={onSubmit} action="">
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="nombre"
                                    value={usuarioData.Nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contraseña" className="form-label">Contraseña</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="contraseña"
                                    value={usuarioData.Contraseña}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellido" className="form-label">Apellido</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="apellido"
                                    value={usuarioData.Apellido}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label">Teléfono</label>
                                <input
                                    className="form-control"
                                    type="tel"
                                    name="telefono"
                                    value={usuarioData.Telefono}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label">Correo</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="correo"
                                    value={usuarioData.Correo}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="foto" className="form-label">Foto Nueva</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    name="foto"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                            {usuarioData.Foto && (
                                <div className="mb-3">
                                    <label className="form-label">Foto Actual: </label>
                                    <img
                                        src={usuarioData.Foto}
                                        alt="Foto Actual"
                                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                                    />
                                </div>
                            )}
                            <div className="mb-3">
                                <label htmlFor='estado' className="form-label">Estado: </label>
                                <select
                                    name='estado'
                                    value={usuarioData.Estado ? "true" : "false"}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor='esadmin' className="form-label">Admin: </label>
                                <select
                                    name='esadmin'
                                    value={usuarioData.Esadmin ? "true" : "false"}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor='esanfitrion' className="form-label">Anfitrion: </label>
                                <select
                                    name='esanfitrion'
                                    value={usuarioData.Esanfitrion ? "true" : "false"}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>

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
