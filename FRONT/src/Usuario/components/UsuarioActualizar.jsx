import { useEffect, useState } from "react";
import axios from 'axios';

export const UsuarioActualizar = ({ usuario }) => {
    const [usuarioData, setUsuarioData] = useState({
        nombre: "",
        contraseña: "",
        apellido: "",
        telefono: "",
        correo: "",
        estado: true,
        esadmin: false,
        esanfitrion: false,
        foto: ""
    });
    // const getUsuarios = async () => {
    //     try {
    //         const data = await usuario;
    //         return data;
    //     } catch (error) {
    //         console.error("Error al obtener los datos del plato:", error);
    //     }
    // };

    const fetchData = async () => {
        try {
            const data = await usuario;
            return data;
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
        }
    };

    useEffect(() => {
        fetchData().then((data) => {
            console.log(data.Nombre)
            setUsuarioData({
                nombre: data.Nombre,
                contraseña: data.Contraseña,
                apellido: data.Apellido,
                telefono: data.Telefono,
                correo: data.Correo,
                estado: data.Estado,
                esadmin: data.Esadmin,
                esanfitrion: data.Esanfitrion,
                foto: data.Foto,
            });
        });
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
                                    value={usuarioData.nombre}
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
                                    value={usuarioData.contraseña}
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
                                    value={usuarioData.apellido}
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
                                    value={usuarioData.telefono}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="correo" className="form-label">Correo</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="correo"
                                    value={usuarioData.correo}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div class="mb-3">
                                <label htmlFor="foto" class="form-label">Foto Nueva</label>
                                <input
                                    class="form-control"
                                    type="file"
                                    name="foto"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                            {usuarioData.foto && (
                                <div className="mb-3">
                                    <label className="form-label">Foto Actual: </label>
                                    <img
                                        src={usuarioData.foto}
                                        alt="Foto Actual"
                                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                                    />
                                </div>
                            )}
                            <div class="mb-3">
                                <label htmlFor='estado' class="form-label">Estado: </label>
                                <select
                                    name='estado'
                                    value={usuarioData.estado ? "true" : "false"}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label htmlFor='esadmin' class="form-label">Admin: </label>
                                <select
                                    name='esadmin'
                                    value={usuarioData.esadmin ? "true" : "false"}
                                    onChange={handleInputChange}
                                    class="form-select"
                                >
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label htmlFor='esanfitrion' class="form-label">Anfitrion: </label>
                                <select
                                    name='esanfitrion'
                                    value={usuarioData.esanfitrion ? "true" : "false"}
                                    onChange={handleInputChange}
                                    class="form-select"
                                >
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>

                            <div class="d-flex justify-content-between">
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
