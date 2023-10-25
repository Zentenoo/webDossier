import axios from 'axios'
export async function getAllPlato (){
    var url='http://localhost:3000/plato'
    const resp=await axios.get(url)
    const plato = resp.data.map(plato =>({
        id: plato.id,
        nombre: plato.nombre,
        descripcion: plato.descripcion,
        foto: plato.foto,
        estado: plato.estado,
    }));
    return plato
}