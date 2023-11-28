import { Route, Routes } from "react-router-dom"
import { ReservaPage } from "../pages/ReservaPage"


export const ReservaRoutes=()=>{
    
    return(
        <>
            <Routes>
                <Route path="/*" element={<ReservaPage/>}></Route>
                {/* <Route path="/:id" element={<EditPlato/>}></Route> */}
            </Routes>
        </>
    )
}   