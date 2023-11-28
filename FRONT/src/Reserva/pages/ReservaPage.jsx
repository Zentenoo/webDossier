import { ReservaList } from "../components/ReservaList"

export const ReservaPage = () => {
    return (
        <>
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                    <h1>Lista de Reservas</h1>
                </div>
                <hr></hr>
            </div>
            <ReservaList />
        </>
    )
}