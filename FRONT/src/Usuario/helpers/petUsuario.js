    import axios from 'axios';

    const API_BASE_URL = 'http://localhost:3000';

    export async function getAllUsuarios() {
        const url = `${API_BASE_URL}/usuario`;
        const resp = await axios.get(url);
        const usuarios = resp.data.map(usuario => ({
            id: usuario.id,
            Nombre: usuario.nombre,
            Contraseña: usuario.contraseña,
            Apellido: usuario.apellido,
            Telefono: usuario.telefono,
            Correo: usuario.correo,
            Estado: usuario.estado,
            Esadmin: usuario.esadmin,
            Esanfitrion: usuario.esanfitrion,
            Foto: usuario.foto,
        }));
        return usuarios;
    }
    export async function getUsuario(id) {
        const url = `${API_BASE_URL}/usuario/${id}`;
        try {
            const resp = await axios.get(url);
            return resp.data;
        } catch (error) {
            throw error; 
        }
    }

    export async function createUsuario(usuarioData) {
        console.log(usuarioData)
        const url = `${API_BASE_URL}/register`;
        const resp = await axios.post(url, usuarioData);
        return resp.data;
    }

    export async function updateUsuario(id, usuarioData) {
        const url = `${API_BASE_URL}/usuario/${id}`;
        const resp = await axios.put(url, usuarioData);
        return resp.data;
    }

export async function deleteUsuario(id) {
    const url = `${API_BASE_URL}/usuario/${id}`
    const resp = await axios.delete(url);

    return resp.data;
    
}




