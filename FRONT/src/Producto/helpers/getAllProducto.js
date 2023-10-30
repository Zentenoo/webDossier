import axios from 'axios';

export async function getAllProducto() {
  const url = 'http://localhost:3000/producto';
  const resp = await axios.get(url);

  if (resp.status === 200) {
    const productos = resp.data.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      estado: producto.estado,
      foto: producto.foto,
    }));
    return productos;
  } else {
    throw new Error('Error al obtener los productos');
  }
}