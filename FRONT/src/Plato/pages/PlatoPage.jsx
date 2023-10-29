import { PlatoList } from "../components/PlatoList"

export const PlatoPage = () => {
  return (
    <>

      <div className="container">
        <h1>Lista de Platos</h1>
        <hr></hr>
        <a className="btn btn-primary" href="/plato/create" style={{marginBottom: "5px"}}>Crear Plato</a>
      </div>
      <PlatoList />
    </>
  )
}