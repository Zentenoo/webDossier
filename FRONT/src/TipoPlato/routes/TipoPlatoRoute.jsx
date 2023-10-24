import { Route, Routes } from "react-router-dom"
import { TipoPlatoPage } from "../pages/TipoPlatoPage"
import { EditTipoPlatoPage } from "../pages/EditTipoPlatoPage"
import { CreateTipoPlatoPage } from "../pages/CreateTipoPlatoPage"

export const TipoPlatoRoute=()=>{
    
    return(
        <>
            <Routes>
                <Route path="/*" element={<TipoPlatoPage/>}></Route>
                <Route path="/tipo_plato/edit/:id" element={<EditTipoPlatoPage/>}></Route>
                <Route path="/tipo_plato/create" element={<CreateTipoPlatoPage/>}></Route>

            </Routes>
        </>
    )
}