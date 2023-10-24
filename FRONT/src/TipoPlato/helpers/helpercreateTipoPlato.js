import axios from "axios";

export async function createTipoPlato(nuevoTipoPlato) {
  try {
    const url = "http://localhost:3000/tipo_plato"; // Reemplaza con la URL de tu servidor
    const response = await axios.post(url, nuevoTipoPlato);
    return response.status === 201; // El código de estado 201 indica que se creó el recurso con éxito
  } catch (error) {
    console.error("Error al crear el tipo de plato:", error);
    return false; // Retorna `false` en caso de error
  }
}
