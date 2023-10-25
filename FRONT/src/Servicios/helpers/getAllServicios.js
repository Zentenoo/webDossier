import axios from 'axios'

export async function getAllServicios(){
    var url='http://localhost:3000/servicio'
    const resp=await axios.get(url)
    const servicios = resp.data.map(servicio =>({
        id: servicio.id,
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        fechaInicio: servicio.fechaInicio,
        fechaFin: servicio.fechaFin,
        cupo: servicio.cupo,
        precio: servicio.precio,
        foto: servicio.foto,
    }));
    return servicios
}
