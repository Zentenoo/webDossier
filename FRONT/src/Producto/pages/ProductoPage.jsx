import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import { ProductoList } from "../components/ProductoList";

export const ProductoPage = () => {
  return (
    <>

      <div className="container">
        <h1>Lista de Productos</h1>
        <hr></hr>
        <Link to="/producto/create" className="btn btn-primary" style={{marginBottom: "5px"}}>
          Crear Producto
        </Link>
      </div>
      <ProductoList />

    </>
  );
};
