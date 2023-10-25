import { createUsuario } from "../helpers/petUsuario";
import { useEffect, useState } from "react";
export const UsuarioCrear = () => {
    const [usuarioData, setUsuarioData] = useState({
        nombre: "",
        contraseña: "",
        apellido: "",
        telefono: "",
        correo: "",
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
            console.log("Usuario creado:", response);
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    };
    return(
        <div>
            <h1>Crear Usuario</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={usuarioData.nombre}
                    onChange={handleInputChange}
                />
                <br />

                <label htmlFor="contrasena">Contraseña:</label>
                <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    value={usuarioData.contraseña}
                    onChange={handleInputChange}
                />
                <br />

                <label htmlFor="apellido">Apellido:</label>
                <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={usuarioData.apellido}
                    onChange={handleInputChange}
                />
                <br />

                <label htmlFor="telefono">Teléfono:</label>
                <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={usuarioData.telefono}
                    onChange={handleInputChange}
                />
                <br />

                <label htmlFor="correo">Correo:</label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={usuarioData.correo}
                    onChange={handleInputChange}
                />
                <br />

                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    )
}