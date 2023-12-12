import { Route, Routes } from "react-router-dom"
import { ConsumoPage } from "../pages/ConsumoPage"


export const ConsumoRoutes=()=>{
    
    return(
        <>
            <Routes>
                <Route path="/*" element={<ConsumoPage/>}></Route>
                {/* <Route path="/create" element={<CreatePlatoPage/>}></Route>
                <Route path="/:id" element={<EditPlato/>}></Route> */}
            </Routes>
        </>
    )
}   