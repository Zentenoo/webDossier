import { Route, Routes } from "react-router-dom";
import { UsuariosPage } from "../pages/UsuarioPage";

export const UsuariosRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<UsuariosPage />} />
            </Routes>
        </>
    );
};
