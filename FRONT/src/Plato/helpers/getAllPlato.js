import axios from 'axios';

export async function getAllPlato() {
  const url = 'http://localhost:3000/plato';
  const resp = await axios.get(url);

  if (resp.status === 200) {
    const platos = resp.data.map((plato) => ({
      id: plato.id,
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      estado: plato.estado,
      foto: plato.foto,
      tipoplato: plato.tipoplato,
    }));
    return platos;
  } else {
    return "error";
  }
}
