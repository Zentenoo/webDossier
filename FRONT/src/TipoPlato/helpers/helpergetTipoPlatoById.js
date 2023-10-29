import axios from 'axios';

export async function getTipoPlatoById(id) {
  try {
    const url = `http://localhost:3000/tipo_plato/${id}`;
    const response = await axios.get(url);
    const tipoPlato = {
      id: response.data.id,
      nombre: response.data.nombre,
      descripcion: response.data.descripcion,
    };
    return tipoPlato;
  } catch (error) {
    console.error(`Error al obtener el tipo de plato con ID ${id}: ${error.message}`);
    return null;
  }
}
