import { useState } from 'react';
import axios from 'axios';

export const Login = () => {
  const [credentials, setCredentials] = useState({
    correo: '',
    contraseña: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', credentials);
      console.log(response.data);
      // Maneja la respuesta aquí, por ejemplo, guardando el token o redirigiendo a otra página
      window.location.href = 'usuario/lista'
    } catch (error) {
        console.error('Error en el login:', error);
        setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h2 className="text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo:</label>
            <input
              type="email"
              className="form-control"
              id="correo"
              name="correo"
              value={credentials.correo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contraseña" className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              id="contraseña"
              name="contraseña"
              value={credentials.contraseña}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p>¿No tienes una cuenta? <a href="usuario/crear">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
};
