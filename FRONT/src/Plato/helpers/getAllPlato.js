import axios from 'axios';

export async function getAllPlato() {
  const url = 'http://localhost:3000/plato';
  const resp = await axios.get(url);
  console.log(resp.data)
  if (resp.status === 200) {
    const platos = resp.data.map((plato) => ({
      id: plato.id,
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      estado: plato.estado,
      foto: plato.foto,
      tipoplato: plato.tipoplato,
      tipoplatoid:plato.tipoplatoid
    }));
    return platos;
  } else {
    return "error";
  }
}