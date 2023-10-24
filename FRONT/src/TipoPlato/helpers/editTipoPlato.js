import axios from 'axios';

export async function editTipoPlato(id, nombre, descripcion) {
  var url = `http://localhost:3000/tipo_plato/${id}`;
  const data = {
    nombre: nombre,
    descripcion: descripcion
  };
  const resp = await axios.put(url, data);
  return resp.data;
}