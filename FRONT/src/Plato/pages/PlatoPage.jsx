import { PlatoList } from "../components/PlatoList"

export const PlatoPage = () => {
  return (
    <>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
          <h1>Lista de Platos</h1>
          <a className="btn btn-primary" href="/plato/create" style={{ marginBottom: "5px" }}>Crear Plato</a>
        </div>
        <hr></hr>
      </div>
      <PlatoList />
    </>
  )
}