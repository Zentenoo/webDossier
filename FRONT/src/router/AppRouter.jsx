import {Routes, Route} from "react-router-dom"
import { InicioRoutes } from "../inicio/InicioRoutes"
import { UsuariosRoute } from "../Usuario/routes/UsuarioRoute"
import { TipoPlatoRoute } from "../TipoPlato/routes/TipoPlatoRoute"
import { ServicioRoute } from "../Servicios/routes/ServicioRoute"
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
                                <a class="nav-link" href="/plato">Plato</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/tipo_plato">Tipo Plato</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/usuario">Usuario</a>
                            </li><li class="nav-item">
                                <a class="nav-link" href="/servicios">Servicio</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
                <Routes>
                    <Route path="/*" element={<InicioRoutes/>}></Route>
                    <Route path="/plato/*" element={<PlatoRoutes/>}></Route>
                    <Route path="/tipo_plato/*" element={<TipoPlatoRoute/>}></Route>
                    <Route path="/usuario/*" element={<UsuariosRoute/>}></Route>
                    <Route path="/servicios/*" element={<ServicioRoute/>}></Route>
                </Routes>
        </>
    )
}
