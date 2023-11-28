import axios from 'axios';

export async function getServPlatoById(id) {
  try {
    const url = `http://localhost:3000/servplato/${id}`;
    const response = await axios.get(url);
    const servPlato = {
      id: response.data.id,
      platoid: response.data.platoid,
      servicioid: response.data.servicioid,
      // Agrega otros campos de acuerdo a la estructura de ServPlato
    };
    return servPlato;
  } catch (error) {
    console.error(`Error al obtener el ServPlato con ID ${id}: ${error.message}`);
    return null; // Maneja errores, por ejemplo, retornando null en caso de error
  }
}
