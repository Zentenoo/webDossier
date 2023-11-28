import { TipoPlatoList } from "../components/TipoPlatoList";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import { CreateTipoPlatoPage } from "./CreateTipoPlatoPage";

export const TipoPlatoPage = () => {
  return (
    <>
      <div className="container">
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
          <h1>Lista de Tipo de Plato</h1>
          {/* <Link to="/tipo_plato/create" className="btn btn-primary">
            Crear Tipo Plato
          </Link> */}
          <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalLabel">
              Crear Tipo Plato
            </button>
            <div className="modal fade" id="exampleModalLabel" tabIndex="-1" aria-labelledby="#exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel" style={{ color: "black" }}>Crear Nuevo Tipo de Plato</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-header d-flex justify-content-between">
                    <CreateTipoPlatoPage/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <TipoPlatoList />
      </div>
    </>
  );
};