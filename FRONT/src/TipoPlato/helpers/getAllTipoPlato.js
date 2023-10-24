import axios from 'axios'
export async function getAllTipoPlato (){
    var url='http://localhost:3000/tipo_plato'
    const resp=await axios.get(url)
    const tipoPlato = resp.data.map(plato =>({
        id: plato.id,
        nombre: plato.nombre,
        descripcion: plato.descripcion,
    }));
    return tipoPlato
}