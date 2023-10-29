import { Route, Routes } from "react-router-dom";
import { UsuariosPage } from "../pages/UsuarioPage";
import { UsuarioCrear } from "../components/UsuarioCrear";
import {UsuarioActualizar}from "../components/UsuarioActualizar"
export const UsuariosRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<UsuariosPage />} />
                <Route path="/crear" element={<UsuarioCrear/>}></Route>
                <Route path="/:id" element={<UsuarioActualizar/>}></Route>
            </Routes>
        </>
    );
};
