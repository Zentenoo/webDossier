import { PlatosList } from "../components/PlatoList"

export const PlatoPage=()=>{
    return (
        <>
          
          <PlatosList/>
          <div class="container">
            <a class="btn btn-primary" href="/prenda/create">Crear Plato</a>
          </div>
        </>
      )
}