const jwt = require('jsonwebtoken');
const secretKey = 'tu_clave_secreta';

const crearToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '24h' });
};

const verificarToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Token inválido');
  }
};

module.exports = { crearToken, verificarToken };