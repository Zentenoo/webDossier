import { Route, Routes } from "react-router-dom"
import { TipoPlatoPage } from "../pages/TipoPlatoPage"

export const TipoPlatoRoute=()=>{
    
    return(
        <>
            <Routes>
                <Route path="/*" element={<TipoPlatoPage/>}></Route>
            </Routes>
        </>
    )
}