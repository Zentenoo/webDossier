import { UsuariosList } from "../components/UsuarioList";

export const UsuariosPage = () => {
    return (
        <>
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                    <h1>Lista de Usuarios</h1>
                    <a className="btn btn-primary" href="/usuario/create" style={{ marginBottom: "5px" }}>Crear Usuario</a>
                </div>
                <hr></hr>
            </div>
            <UsuariosList />
            {/* <div className="container">
                <a className="btn btn-primary" href="/usuario/crear">Crear Usuario</a>
            </div> */}
        </>
    );
};