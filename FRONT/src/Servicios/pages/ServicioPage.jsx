import { ServicioList } from "../components/ServicioList";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom

export const ServicioPage = () => {
  return (
    <>
      <div className="container">
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:'5px'}}>
          <h1>Lista de Servicios</h1>
          <Link to="/servicios/create" className="btn btn-primary">
              Crear Servicio
          </Link>
        </div>
        <hr></hr>
      </div>
      <ServicioList />
    </>
  );
};
