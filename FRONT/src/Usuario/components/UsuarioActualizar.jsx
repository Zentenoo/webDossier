import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export const UsuarioActualizar = () => {
    const [usuarioData, setUsuarioData] = useState({
        nombre: "",
        contraseña: "",
        apellido: "",
        telefono: "",
        correo: "",
        estado: true, 
        esadmin: false,
        esanfitrion:false,
        foto: ""
    });

    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/usuario/${params.id}`);
                const userData = response.data;
                console.log(userData)
                setUsuarioData(userData);
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };
        fetchData();
    }, [params.id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/usuario/${params.id}`, usuarioData);
            
            window.location.href = "/usuario";
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUsuarioData({
            ...usuarioData,
            [name]: value === "true", 
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
    

    return (
        <div className="container mt-10">
            <section className="d-flex justify-content-center">
                <div className="card col-sm-6 p-3">
                    <div className="mb-3">
                        <h4>Editar Usuario</h4>
                    </div>
                    <div className="mb-2">
                        <form onSubmit={onSubmit} action="">
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={usuarioData.nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contrasena" className="form-label">Contraseña</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    id="contraseña"
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
                                    id="apellido"
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
                                    id="telefono"
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
                                    id="correo"
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
                                    id="foto"
                                    name="foto"
                                    onChange={handleFileChange}
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
                                    id='estado'
                                    name='estado'
                                    value={usuarioData.estado ? "true" :"false"}
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
                                    id='esadmin'
                                    name='esadmin'
                                    value={usuarioData.esadmin ? "true" :"false"}
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
                                    id='esanfitrion'
                                    name='esanfitrion'
                                    value={usuarioData.esanfitrion ? "true" :"false"}
                                    onChange={handleInputChange}
                                    class="form-select"
                                >
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>
                            
                            <div class="d-flex justify-content-between">
                                <button className="btn btn-primary" type="submit">Editar</button>
                                <Link to="/usuario" className="btn btn-secondary">Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};
