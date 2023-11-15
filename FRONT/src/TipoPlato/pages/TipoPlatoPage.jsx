import { TipoPlatoList } from "../components/TipoPlatoList";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom

export const TipoPlatoPage = () => {
  return (
    <>
      <div className="container">
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
          <h1>Lista de Tipo de Plato</h1>
          <Link to="/tipo_plato/create" className="btn btn-primary">
            Crear Tipo Plato
          </Link>
        </div>
        <hr></hr>
        <TipoPlatoList />
      </div>
    </>
  );
};
