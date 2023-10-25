import { Route, Routes } from "react-router-dom"
import { PlatoPage } from "../pages/PlatoPage"
import { CreatePlatoPage } from "../pages/CreatePlato"
import { EditPlato } from "../pages/EditPlato"


export const PlatoRoutes=()=>{
    
    return(
        <>
            <Routes>
                <Route path="/*" element={<PlatoPage/>}></Route>
                <Route path="/create" element={<CreatePlatoPage/>}></Route>
                <Route path="/:id" element={<EditPlato/>}></Route>
            </Routes>
        </>
    )
}   