import axios from 'axios'
export async function getAllTipoPlato (){
    var url='http://localhost:3000/tipo_plato'
    const resp=await axios.get(url)
    const tipoPlato = resp.data.map(tipoPlato =>({
        id: tipoPlato.id,
        nombre: tipoPlato.nombre,
        descripcion: tipoPlato.descripcion,
    }));
    return tipoPlato
}