import axios from 'axios';

export async function deleteTipoPlato(id) {
  try {
    const url = `http://localhost:3000/tipo_plato/${id}`;
    const response = await axios.delete(url);
    console.log('Response from deleteTipoPlato:', response.data); // Agrega esta línea para depuración
    return true; // Devuelve true para indicar éxito
  } catch (error) {
    console.error(`Error deleting TipoPlato with ID ${id}: ${error.message}`);
    return false; // Devuelve false para indicar fallo
  }
}
