import axios from "axios";

export async function createServicio(nuevoServicio) {
  try {
    const url = "http://localhost:3000/servicio"; // Reemplaza con la URL de tu servidor
    const response = await axios.post(url, nuevoServicio);
    return response.status === 200;
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    return false; // Retorna `false` en caso de error
  }
}
