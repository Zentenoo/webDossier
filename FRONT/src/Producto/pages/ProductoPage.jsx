import { Link } from "react-router-dom"; // Importa Link de react-router-dom
import { ProductoList } from "../components/ProductoList";

export const ProductoPage = () => {
  return (
    <>

      <div className="container">
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "5px" }}>
          <h1>Lista de Productos</h1>
          <Link to="/producto/create" className="btn btn-primary" style={{ marginBottom: "5px" }}>
            Crear Producto
          </Link>
        </div>
        <hr></hr>
        <ProductoList />
      </div>
    </>
  );
};
