import axios from 'axios'


export const deleteConsumo=async (id) => {
    await axios.delete(`http://localhost:3000/consumo/${id}`)
};