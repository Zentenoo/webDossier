import { TipoPlatoList } from "../components/TipoPlatoList"

export const TipoPlatoPage=()=>{
    return (
        <>
          
          <TipoPlatoList/>
          <div class="container">
            <a class="btn btn-primary" href="/prenda/create">Crear Plato</a>
          </div>
        </>
      )
}