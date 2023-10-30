import {Routes, Route} from "react-router-dom"
import { InicioRoutes } from "../inicio/InicioRoutes"
import { UsuariosRoute } from "../Usuario/routes/UsuarioRoute"
import { TipoPlatoRoute } from "../TipoPlato/routes/TipoPlatoRoute"
import { ServicioRoute } from "../Servicios/routes/ServicioRoute"
import { PlatoRoutes } from "../Plato/routes/PlatoRoutes"
import { ProductoRoute } from "../Producto/routes/ProductoRoute"

export const AppRouter = () => {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">DossierUdi</a>
                    <div className="navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item">
                                <a className="nav-link" href="/tipo_plato">Tipo Plato</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/plato">Plato</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/usuario">Usuario</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/servicios">Servicio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/producto">Producto</a>
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
                    <Route path="/producto/*" element={<ProductoRoute/>}></Route>
                </Routes>
        </>
    )
}
