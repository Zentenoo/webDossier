import { getAllUsuarios, deleteUsuario } from "../helpers/petUsuario";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UsuariosList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

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
            <div className="row">
                {usuarios.map((usuario) => (
                    <div className="col-lg-4 mb-4" key={usuario.id}>
                        <div className="card">
                            <img
                                src={usuario.Foto}
                                className="card-img-top"
                                alt={`${usuario.nombre}`}
                                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{usuario.Nombre} {usuario.Apellido}</h5>
                                <p className="card-text">Correo: {usuario.Correo}</p>
                                <p className="card-text">Estado: {usuario.Estado ? "Activo" : "Inactivo"}</p>
                                <p className="card-text">Admin: {usuario.EsAdmin ? "Sí" : "No"}</p>
                                <p className="card-text">Anfitrión: {usuario.EsAnfitrion ? "Sí" : "No"}</p>
                                <div className="d-flex justify-content-between">
                                    <a onClick={() => navigate(`/usuario/${usuario.id}`)} className="btn btn-primary">
                                        <i className="bi bi-pencil-square"></i> Editar
                                    </a>
                                    <button
                                        onClick={() => handleEliminarUsuario(usuario.id)}
                                        type="button"
                                        className="btn btn-danger"
                                    >
                                        <i className="bi bi-trash"></i> Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
