import {Routes, Route} from "react-router-dom"
import { InicioRoutes } from "../inicio/InicioRoutes"
import { PlatoRoute } from "../Plato/routes/PlatoRoute"
import { UsuariosRoute } from "../Usuario/routes/UsuarioRoute"
import { UsuarioCrear } from "../Usuario/components/UsuarioCrear"
import { UsuarioActualizar } from "../Usuario/components/UsuarioActualizar"
export const AppRouter = () => {
    return(
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">DossierUdi</a>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/plato">Plato</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/usuario">Usuario</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
                <Routes>
                    <Route path="/*" element={<InicioRoutes/>}></Route>
                    <Route path="/plato/*" element={<PlatoRoute/>}></Route>
                    <Route path="/usuario/*" element={<UsuariosRoute/>}></Route>
                    <Route path="/usuario/crear/" element={<UsuarioCrear/>}></Route>
                    <Route path="/usuario/actualizar/:id/" element={<UsuarioActualizar/>}></Route>
                </Routes>
        </>
    )
}