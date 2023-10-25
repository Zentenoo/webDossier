import { Route, Routes } from "react-router-dom"
import { PlatoPage } from "../pages/PlatoPage"

export const PlatoRoute=()=>{
    
    return(
        <>
            <Routes>
                <Route path="/*" element={<PlatoPage/>}></Route>
            </Routes>
        </>
    )
}