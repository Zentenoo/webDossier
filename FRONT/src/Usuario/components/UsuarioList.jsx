import { getAllUsuarios, deleteUsuario } from "../helpers/petUsuario";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsuarioActualizar } from "./UsuarioActualizar";

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
                                <p className="card-text">Admin: {usuario.Esadmin ? "Sí" : "No"}</p>
                                <p className="card-text">Anfitrión: {usuario.Esanfitrion ? "Sí" : "No"}</p>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal${usuario.id}e`}>
                                            <i className="bi bi-pencil-square"></i> Editar
                                        </button>
                                        <div className="modal fade" id={`exampleModal${usuario.id}e`} tabIndex="-1" aria-labelledby={`#exampleModal${usuario.id}e`} aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id={`exampleModal${usuario.id}e`} style={{ color: "black" }}>Editar Usuario "{usuario.Nombre} {usuario.Apellido}"?</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-header d-flex justify-content-between">
                                                        <UsuarioActualizar usuario={usuario} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#exampleModal${usuario.id}`}>
                                            <i className="bi bi-trash"></i> Eliminar
                                        </button>
                                        <div className="modal fade" id={`exampleModal${usuario.id}`} tabIndex="-1" aria-labelledby={`exampleModal${usuario.id}`} aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id={`exampleModal${usuario.id}`}>Desea eliminar el usuario "{usuario.Nombre} {usuario.Apellido}"?</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-header d-flex justify-content-between">
                                                        <button onClick={() => handleEliminarUsuario(usuario.id)} type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                                            <i className="bi bi-trash"></i> Eliminar
                                                        </button>
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
