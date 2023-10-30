import axios from 'axios';

export async function getProducto(id) {
  var url = `http://localhost:3000/producto/${id}`;
  const resp = await axios.get(url);
  return resp.data;
}