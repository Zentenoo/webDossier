import { PlatoList } from "../components/PlatoList"


export const PlatoPage = () => {

    return (
        <>
            <PlatoList/>
            <div class="container">
                <a class="btn btn-primary" href="/plato/create">Crear Plato</a>
            </div>
        </>

    )
}