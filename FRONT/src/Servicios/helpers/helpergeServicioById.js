import axios from 'axios';

export async function getServicioById(id) {
  try {
    const url = `http://localhost:3000/servicio/${id}`;
    const response = await axios.get(url);
    const servicio = {
      id: response.data.id,
      nombre: response.data.nombre,
      descripcion: response.data.descripcion,
      fechaInicio: response.data.fechaInicio,
      fechaFin: response.data.fechaFin,
      cupo: response.data.cupo,
      precio: response.data.precio,
      foto: response.data.foto,
    };
    return servicio;
  } catch (error) {
    console.error(`Error al obtener el servicio con ID ${id}: ${error.message}`);
    return null; // Maneja errores, por ejemplo, retornando null en caso de error
  }
}
