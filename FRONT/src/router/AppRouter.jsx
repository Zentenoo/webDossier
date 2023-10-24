import {Routes, Route} from "react-router-dom"
import { InicioRoutes } from "../inicio/InicioRoutes"

export const AppRouter = () => {
    return(
        <>
            <nav>
                <div>
                    <a href="/">DossierUdi</a>
                </div>
            </nav>
            <Routes>
                <Route path="/*" element={<InicioRoutes/>}></Route>
            </Routes>
        </>
    )
}