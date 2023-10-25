import { Route, Routes } from "react-router-dom"
import { ServicioPage } from "../pages/ServicioPage"
import { EditServicioPage } from "../pages/EditServicioPage"
import { CreateServicioPage } from "../pages/CreateServicioPage"

export const ServicioRoute=()=>{
    
    return(
        <>
            <Routes>
                <Route path="/*" element={<ServicioPage/>}></Route>
        
                <Route path="/servicio/edit/:id" element={<EditServicioPage/>}></Route>
                
                <Route path="/servicio/create" element={<CreateServicioPage/>}></Route>
                
            </Routes>
        </>
    )
}