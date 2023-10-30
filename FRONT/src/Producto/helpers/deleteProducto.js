import axios from 'axios'


export const deleteProducto =async (id) => {
    await axios.delete(`http://localhost:3000/producto/${id}`)
};