import axios from 'axios';

export async function deleteServicio(id) {
  try {
    const url = `http://localhost:3000/servicio/${id}`;
    const response = await axios.delete(url);
    console.log('Response from deleteServicio:', response.data); // Agrega esta línea para depuración
    return response.status === 204; // Devuelve true para indicar éxito
  } catch (error) {
    console.error(`Error deleting Servicio with ID ${id}: ${error.message}`);
    return false; // Devuelve false para indicar fallo
  }
}
