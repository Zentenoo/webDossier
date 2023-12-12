import { Route, Routes } from "react-router-dom"
import { ServicioPage } from "../pages/ServicioPage"
import { EditServicioPage } from "../pages/EditServicioPage"
import { CreateServicioPage } from "../pages/CreateServicioPage"
import { ServicioInfoPage } from "../pages/ServicioInfoPage"

export const ServicioRoute=()=>{
    
    return(
        <>
            <Routes>
                <Route path="/*" element={<ServicioPage/>}></Route>
                <Route path="/edit/:id" element={<EditServicioPage/>}></Route>
                <Route path="/create" element={<CreateServicioPage/>}></Route>
                <Route path="/:id" element={<ServicioInfoPage/>}></Route>
                
            </Routes>
        </>
    )
}