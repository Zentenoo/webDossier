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
    });

    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/usuario/${params.id}`);
                const userData = response.data;
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
            [name]: value,
        });
    };

    return (
        <div class="container mt-10">
            <section class="d-flex justify-content-center">
                <div class="card col-sm-6 p-3">
                    <div class="mb-3">
                        <h4>Editar Usuario</h4>
                    </div>
                    <div class="mb-2">
                        <form onSubmit={onSubmit} action="">
                            <div class="mb-3">
                                <label htmlFor="nombre" class="form-label">Nombre</label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={usuarioData.nombre}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="contrasena" class="form-label">Contraseña</label>
                                <input
                                    class="form-control"
                                    type="password"
                                    id="contraseña"
                                    name="contraseña"
                                    value={usuarioData.contraseña}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="apellido" class="form-label">Apellido</label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    value={usuarioData.apellido}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="telefono" class="form-label">Teléfono</label>
                                <input
                                    class="form-control"
                                    type="tel"
                                    id="telefono"
                                    name="telefono"
                                    value={usuarioData.telefono}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="correo" class="form-label">Correo</label>
                                <input
                                    class="form-control"
                                    type="email"
                                    id="correo"
                                    name="correo"
                                    value={usuarioData.correo}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label htmlFor='estado' class="form-label">Estado: </label>
                                <select
                                    id='estado'
                                    name='estado'
                                    value={usuarioData.estado}
                                    onChange={handleInputChange}
                                    class="form-select"
                                >
                                    <option value={true}>Activo</option>
                                    <option value={false}>Inactivo</option>
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
