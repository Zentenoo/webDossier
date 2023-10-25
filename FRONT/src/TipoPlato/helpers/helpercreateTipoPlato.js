import axios from "axios";

export async function createTipoPlato(nuevoTipoPlato) {
  try {
    const url = "http://localhost:3000/tipo_plato";
    const response = await axios.post(url, nuevoTipoPlato);
    return response.status === 200;
  } catch (error) {
    console.error("Error al crear el tipo de plato:", error);
    return false;
  }
}
