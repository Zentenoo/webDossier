import axios from 'axios';

export async function getAllServPlatosByServId(id) {
  try {
    const url = `http://localhost:3000/servplato/servicio/${id}`;
    const response = await axios.get(url);
    console.log("Datos aqui",response.data)
    
    const servPlatos = response.data.map((item) => ({
      id: item.id,
      platoid: item.platoid,
      servicioid: item.servicioid,
      // Agrega otros campos de acuerdo a la estructura de ServPlato
    }));
    console.log(servPlatos)
    return servPlatos;
  } catch (error) {
    console.error(`Error al obtener los ServPlatos para el Servicio con ID ${id}: ${error.message}`);
    return null; // Maneja errores, por ejemplo, retornando null en caso de error
  }
}
