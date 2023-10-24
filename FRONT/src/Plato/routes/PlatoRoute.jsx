import { Route, Routes } from "react-router-dom"
import { PlatosList } from "../components/PlatoList"

export const PlatoRoute=()=>{
    
    return(
        <>
            <Routes>
                <Route path="/*" element={<PlatosList/>}></Route>
            </Routes>
        </>
    )
}