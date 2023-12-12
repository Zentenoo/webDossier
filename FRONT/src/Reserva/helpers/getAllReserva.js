import axios from 'axios';

export async function getAllReserva() {
  const url = 'http://localhost:3000/reserva';
  const resp = await axios.get(url);
  if (resp.status === 200) {
    const reservas = resp.data.map((reserva) => ({
      id: reserva.id,
      fechareserva: new Date(reserva.fechareserva).toLocaleDateString(),
      fechaservicio: new Date(reserva.fechaservicio).toLocaleDateString(),
      cupo: reserva.cupo,
      observacion: reserva.observacion,
      estado: reserva.estado,
      total: reserva.total,
      nombre_usuario: reserva.nombre_usuario,
      nombre_servicio: reserva.nombre_servicio,
      usuarioid: reserva.usuarioid,
      servicioid: reserva.servicioid
    }));
    return reservas;
  } else {
    return "error";
  }
}
