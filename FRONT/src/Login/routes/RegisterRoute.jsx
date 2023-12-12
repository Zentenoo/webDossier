import { Route, Routes } from "react-router-dom";

import {Register} from "../../Login/pages/Register"

export const RegisterRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Register/>}></Route>
            </Routes>
        </>
    );
};