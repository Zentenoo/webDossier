import axios from 'axios';

export async function createServPlato(nuevoServPlato) {
  try {
    const url = 'http://localhost:3000/servplato'; // Reemplaza con la URL de tu servidor
    console.log('Enviando solicitud al servidor:', nuevoServPlato);
    const response = await axios.post(url, nuevoServPlato);
    console.log('Respuesta del servidor:', response.data);
    return response.status === 200;
  } catch (error) {
    console.error('Error al crear el ServPlato:', error);
    return false; // Retorna `false` en caso de error
  }
}
