import { UsuarioCrear } from "../components/UsuarioCrear";
import { UsuariosList } from "../components/UsuarioList";
export const UsuariosPage = () => {
    return (
        <>
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                    <h1>Lista de Usuarios</h1>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createUsuarioModal">
                        Crear Usuario
                    </button>
                </div>
                <hr />
            </div>
            <UsuariosList />

            {/* Modal para crear usuario */}
            <div className="modal fade" id="createUsuarioModal" tabIndex="-1" aria-labelledby="createUsuarioModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createUsuarioModalLabel">Crear Nuevo Usuario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <UsuarioCrear/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
