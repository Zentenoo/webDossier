import axios from 'axios'


export const deletePlato =async (id) => {
    await axios.delete(`http://localhost:3000/plato/${id}`)
};