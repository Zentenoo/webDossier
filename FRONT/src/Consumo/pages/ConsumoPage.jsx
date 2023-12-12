import { ConsumoList } from "../components/ConsumoList"
import { CreateConsumoPage } from "./CreateConsumoPage"


export const ConsumoPage = () => {
  return (
    <>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
          <h1>Lista de Consumos</h1>
          <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalLabel">
              Crear Consumo
            </button>
            <div className="modal fade" id="exampleModalLabel" tabIndex="-1" aria-labelledby="#exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel" style={{ color: "black" }}>Crear Nuevo Consumo</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-header d-flex justify-content-between">
                    <CreateConsumoPage/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
      </div>
      <ConsumoList />
    </>
  )
}