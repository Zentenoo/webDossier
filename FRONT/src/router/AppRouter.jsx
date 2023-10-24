import {Routes, Route} from "react-router-dom"
import { InicioRoutes } from "../inicio/InicioRoutes"
import { PlatoRoute } from "../Plato/routes/PlatoRoute"

export const AppRouter = () => {
    return(
        <>
            <nav>
                <div>
                    <a href="/">DossierUdi</a>
                    <a href="/plato">Platos</a>
                </div>
            </nav>
            <Routes>
                <Route path="/*" element={<InicioRoutes/>}></Route>
                <Route path="/plato/*" element={<PlatoRoute/>}></Route>
            </Routes>
        </>
    )
}