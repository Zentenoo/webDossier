import axios from "axios";

export async function createServicio(servicio, listaPlatos) {
  try {
    const url = "http://localhost:3000/servicio"; // Ajusta la URL de tu servidor
    console.log("Enviando solicitud al servidor:", { servicio, listaPlatos });
    const response = await axios.post(url, { servicio, listaPlatos });

    if (response.status === 200) {
      console.log("Servicio creado con éxito.");
      return true;
    } else {
      console.error("Error al crear el servicio:", response.data.message ?? "Error desconocido");
      return false;
    }
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    return false; // Retorna `false` en caso de error
  }
}
