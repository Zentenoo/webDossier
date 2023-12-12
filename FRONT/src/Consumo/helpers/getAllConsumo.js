import axios from 'axios';

export async function getAllConsumo() {
    const url = 'http://localhost:3000/consumo';
    const resp = await axios.get(url);
    if (resp.status === 200) {
        const consumos = resp.data.map((consumo) => ({
            id: consumo.id,
            fecha: new Date(consumo.fecha).toLocaleDateString(),
            estado: consumo.estado,
            total: consumo.total,
            reservaid: consumo.reservaid,
            servicio: consumo.nombre_servicio,
            usuario: consumo.correo_usuario
        }));
        return consumos;
    } else {
        return "error";
    }
}