import { Route, Routes } from "react-router-dom";

import {Login} from "../../Login/pages/Login"

export const LoginRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<Login/>}></Route>
                <Route path="/login" element={<Login/>}></Route>

            </Routes>
        </>
    );
};