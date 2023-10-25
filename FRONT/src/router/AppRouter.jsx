import {Routes, Route} from "react-router-dom"
import { InicioRoutes } from "../inicio/InicioRoutes"
import { TipoPlatoRoute } from "../TipoPlato/routes/TipoPlatoRoute"
import { PlatoRoutes } from "../Plato/routes/PlatoRoutes"

export const AppRouter = () => {
    return(
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">DossierUdi</a>
                    <div class="navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/tipo_plato">Tipo Plato</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/plato">Plato</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
            <Routes>
                <Route path="/*" element={<InicioRoutes/>}></Route>
                <Route path="/tipo_plato/*" element={<TipoPlatoRoute/>}></Route>
                <Route path="/plato/*" element={<PlatoRoutes/>}></Route>
            </Routes>
        </>
    )
}
