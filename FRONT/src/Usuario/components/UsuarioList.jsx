import { getAllUsuarios, deleteUsuario } from "../helpers/petUsuario";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const UsuariosList = () => {
        const [usuarios, setUsuarios] = useState([]);
        const navigate = useNavigate()
        useEffect(() => {
            async function cargarUsuarios() {
                try {
                    const listaUsuarios = await getAllUsuarios();
                    setUsuarios(listaUsuarios);
                } catch (error) {
                    console.error("Error al cargar la lista de usuarios:", error);
                }
            }
            cargarUsuarios();
        }, []);
    
        const handleEliminarUsuario = async (id) => {
            try {
                await deleteUsuario(id);
                const listaActualizada = usuarios.filter((usuario) => usuario.id !== id);
                setUsuarios(listaActualizada);
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
            }
        };
    

    return (
        <div className="container">
            <h1>Lista de Usuarios</h1>
            <hr></hr>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Contraseña</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Admin</th>
                        <th scope="col">Anfitrion</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario =>
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.Nombre}</td>
                            <td>{usuario.Apellido}</td>
                            <td>{usuario.Contraseña}</td>
                            <td>{usuario.Correo}</td>
                            <td><img src={usuario.Foto} alt={`${usuario.nombre}`} width="100" height="100"/></td>
                            <td>{usuario.Estado ? "Activo" : "Inactivo"}</td>
                            <td>{usuario.EsAdmin ? "Activo" : "Inactivo"}</td>
                            <td>{usuario.EsAnfitrion ? "Activo" : "Inactivo"}</td>
                            <td><a onClick={()=>navigate(`/usuario/${usuario.id}`)} className="btn btn- primary"><i className="bi bi-pencil-square"></i></a></td>
                            <td><button onClick={() => handleEliminarUsuario(usuario.id)} type="button" className="btn btn-danger"><i className="bi bi-trash"></i></button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
