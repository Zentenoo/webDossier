import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';


export async function createUsuario(usuarioData) {
    console.log(usuarioData)
    const url = `${API_BASE_URL}/register`;
    const resp = await axios.post(url, usuarioData);
    return resp.data;
}
