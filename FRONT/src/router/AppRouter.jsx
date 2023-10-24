import { Routes, Route, Link } from "react-router-dom";
import { InicioRoutes } from "../inicio/InicioRoutes";
import { TipoPlatoRoute } from "../TipoPlato/routes/TipoPlatoRoute";
import { EditTipoPlatoPage } from "../TipoPlato/pages/EditTipoPlatoPage";
import { CreateTipoPlatoPage } from "../TipoPlato/pages/CreateTipoPlatoPage";

export const AppRouter = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            DossierUdi
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                {/* Utiliza Link para la navegación */}
                <Link to="/tipo_plato" className="nav-link">
                  Tipo Plato
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<InicioRoutes />} />
        <Route path="/tipo_plato/*" element={<TipoPlatoRoute />} />
        {/* Ruta para la edición de tipo de plato */}
        <Route path="/tipo_plato/edit/:id" element={<EditTipoPlatoPage />} />
        <Route path="/tipo_plato/create" element={<CreateTipoPlatoPage />} />
      </Routes>
    </>
  );
};
