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
    useEffect(() => {
        if (usuario) {
            setUsuarioData({
                nombre: usuario.Nombre,
                contraseña: usuario.Contraseña,
                apellido: usuario.Apellido,
                telefono: usuario.Telefono,
                correo: usuario.Correo,
                estado: usuario.Estado,
                esadmin: usuario.Esadmin,
                esanfitrion: usuario.Esanfitrion,
                foto: usuario.Foto
            });
        }
    }, [usuario]);


    const onSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...usuarioData,
            esadmin: usuarioData.esadmin || false,
            esanfitrion: usuarioData.esanfitrion || false,
          };
        try {
            await axios.put(`http://localhost:3000/usuario/${usuario.id}`, dataToSend);
            console.log(dataToSend)
            window.location.href = "/usuario/lista";
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'estado' || name === 'esadmin' || name === 'esanfitrion') {
          setUsuarioData({
            ...usuarioData,
            [name]: value === 'true',
          });
        } else {
          setUsuarioData({
            ...usuarioData,
            [name]: value,
          });
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
        window.location.href = "/usuario/lista";
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
                            <div className ="mb-3">
                                <label htmlFor='estado' class="form-label">Estado: </label>
                                <select
                                    name='estado'
                                    value={usuarioData.estado ? "true" :"false"}
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
                                    value={usuarioData.esadmin ? "true" : "false"}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="true" selected={usuarioData.esadmin}>Activo</option>
                                    <option value="false" selected={!usuarioData.esadmin}>Inactivo</option>
                                </select>
                            </div>


                            <div className="mb-3">
                                <label htmlFor='esanfitrion' class="form-label">Anfitrion: </label>
                                <select
                                    name='esanfitrion'
                                    value={usuarioData.esanfitrion ? "true" :"false"}
                                    onChange={handleInputChange}
                                    class="form-select"
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
