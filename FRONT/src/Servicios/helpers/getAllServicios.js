import axios from 'axios'

export async function getAllServicios(){
    var url='http://localhost:3000/servicio'
    const resp=await axios.get(url)
    console.log("Fechas obtenidas del servidor:", resp.data.map(servicio => servicio.fechaInicio));
    const servicios = resp.data.map(servicio =>({
        id: servicio.id,
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        fechaInicio: servicio.fechaInicio,
        fechaFin: servicio.fechaFin,
        cupo: servicio.cupo,
        precio: servicio.precio,
        estado:servicio.estado,
        foto: servicio.foto,
    }));
    return servicios
}
