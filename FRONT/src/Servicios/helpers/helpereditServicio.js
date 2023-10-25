import axios from 'axios';

export async function editServicio(id, nombre, descripcion, fechaInicio, fechaFin, cupo, precio, foto) {
  var url = `http://localhost:3000/servicio/${id}`;
  const data = {
    nombre: nombre,
    descripcion: descripcion,
    fechaInicio: fechaInicio,
    fechaFin: fechaFin,
    cupo: cupo,
    precio: precio,
    foto: foto
  };
  const resp = await axios.put(url, data);
  return resp.data;
}
