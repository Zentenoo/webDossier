import axios from 'axios';

export async function getPlato(id) {
  var url = `http://localhost:3000/plato/${id}`;
  const resp = await axios.get(url);
  return resp.data;
}