import { ServicioList } from "../components/ServicioList";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom

export const ServicioPage = () => {
  return (
    <>
      <ServicioList />
      <div className="container">
        <Link to="/servicio/create" className="btn btn-primary">
          Crear Servicio
        </Link>
      </div>
    </>
  );
};
