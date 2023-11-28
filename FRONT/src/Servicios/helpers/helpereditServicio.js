import axios from 'axios';

export async function editServicio(id, nombre, descripcion, fechaInicio, fechaFin, cupo, precio, estado, foto) {
  var url = `http://localhost:3000/servicio/${id}`;
  const data = {
    nombre: nombre,
    descripcion: descripcion,
    fechaInicio: fechaInicio,
    fechaFin: fechaFin,
    cupo: cupo,
    precio: precio,
    estado: estado,
    foto: foto
  };
  const resp = await axios.put(url, data);
  return resp.data;
}
