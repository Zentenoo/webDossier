import { createUsuario } from "../helpers/petUsuario";
import { useEffect, useState } from "react";
export const UsuarioCrear = () => {
    const [usuarioData, setUsuarioData] = useState({
        nombre: "",
        contraseña: "",
        apellido: "",
        telefono: "",
        correo: "",
        foto:""
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
    return(
        <div class="container mt-10">
            <section class="d-flex justify-content-center">
                <div class="card col-sm-6 p-3">
                    <div class="mb-3">
                        <h1>Registrar</h1>
                    </div>
                    <div class="mb-2">
                        <form onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label htmlFor="nombre" class="form-label">Nombre:</label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={usuarioData.nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                    
                            <div class="mb-3">
                                <label htmlFor="contraseña" class="form-label">Contraseña:</label>
                                <input
                                    class="form-control"
                                    type="password"
                                    id="contraseña"
                                    name="contraseña"
                                    value={usuarioData.contraseña}
                                    onChange={handleInputChange}
                                />
                            </div>
                    
                            <div class="mb-3">
                                <label htmlFor="apellido" class="form-label">Apellido:</label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    value={usuarioData.apellido}
                                    onChange={handleInputChange}
                                />
                            </div>
                    
                            <div class="mb-3">
                                <label htmlFor="telefono" class="form-label">Teléfono:</label>
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
                                <label htmlFor="correo" class="form-label">Correo:</label>
                                <input
                                    class="form-control"
                                    type="email"
                                    id="correo"
                                    name="correo"
                                    value={usuarioData.correo}
                                    onChange={handleInputChange}
                                />
                            </div>
                            
                            <div class="mb-3">
                                <label htmlFor="foto" class="form-label">Seleccionar Foto:</label>
                                <input
                                    type="file"
                                    id="foto"
                                    name="foto"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                    
                            <button type="submit" class="btn btn-primary">Crear Usuario</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}