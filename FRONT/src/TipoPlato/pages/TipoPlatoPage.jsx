import { TipoPlatoList } from "../components/TipoPlatoList";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom

export const TipoPlatoPage = () => {
  return (
    <>
      <TipoPlatoList />
      <div className="container">
        <Link to="/tipo_plato/create" className="btn btn-primary">
          Crear Plato
        </Link>
      </div>
    </>
  );
};
