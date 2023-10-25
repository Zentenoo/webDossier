import { UsuariosList } from "../components/UsuarioList";

export const UsuariosPage = () => {
    return (
        <>
            <UsuariosList />
            <div className="container">
                <a className="btn btn-primary" href="/usuario/crear">Crear Usuario</a>
            </div>
        </>
    );
};