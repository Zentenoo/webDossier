import axios from 'axios'
import { Link } from 'react-router-dom';

export const CreateProductoPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/producto", {
            "nombre": document.getElementById("strNombre").value,
            "descripcion": document.getElementById("strDescripcion").value,
            "precio": document.getElementById("intPrecio").value,
            "stock": document.getElementById("intStock").value,
            "estado": document.getElementById("boolEstado").value,
            "foto": document.getElementById("strFoto").value,
        })
        window.location.href = "/producto";
    }
    return (
        <div className="container mt-10">
            <section className="d-flex justify-content-center ">
                <div className="card col-sm-6 p-3">
                    <div className="mb-3">
                        <h4>Crear Producto</h4>
                    </div>
                    <div className="mb-2">
                        <form onSubmit={onSubmit} action="">
                            <div className="mb-3">
                                <label htmlFor="strNombre" className="form-label">Nombre</label>
                                <input className="form-control" type="text" id="strNombre" name="strNombre" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="strDescripcion" className="form-label">Descripción</label>
                                <input className="form-control" type="text" id="strDescripcion" name="strDescripcion" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="intPrecio" className="form-label">Precio</label>
                                <input className="form-control" type="number" id="intPrecio" name="intPrecio" required min="0" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="intStock" className="form-label">Stock</label>
                                <input className="form-control" type="number" id="intStock" name="intStock" required min="0" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="strFoto" className="form-label">Foto</label>
                                <input className="form-control" type="file" id="strFoto" name="strFoto" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor='boolEstado' className="form-label">Estado: </label>
                                <select id='boolEstado' name='boolEstado' defaultValue="Activo" className="form-select">
                                    <option value={true}>Activo</option>
                                    <option value={false}>Inactivo</option>
                                </select>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-primary" type="submit">Agregar</button>
                                <Link to="/producto" className="btn btn-secondary">Cancelar</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}