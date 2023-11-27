import { Route, Routes } from "react-router-dom";
import { UsuariosPage } from "../pages/UsuarioPage";
import { UsuarioCrear } from "../components/UsuarioCrear";
import {UsuarioActualizar}from "../components/UsuarioActualizar"
import { UsuariosList } from "../components/UsuarioList";
import {Login} from "../components/Login"
export const UsuariosRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<UsuariosPage />} />
                <Route path="/register" element={<UsuarioCrear/>}></Route>
                <Route path="/:id" element={<UsuarioActualizar/>}></Route>
                <Route path="/lista" element={<UsuariosList/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
        </>
    );
};
