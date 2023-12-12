import { Route, Routes } from "react-router-dom";
import { UsuariosPage } from "../pages/UsuarioPage";
import {UsuarioActualizar}from "../components/UsuarioActualizar"
import { UsuariosList } from "../components/UsuarioList";
export const UsuariosRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<UsuariosPage />} />
                <Route path="/:id" element={<UsuarioActualizar/>}></Route>
                <Route path="/lista" element={<UsuariosList/>}></Route>
            </Routes>
        </>
    );
};
