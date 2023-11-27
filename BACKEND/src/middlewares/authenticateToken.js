const jwtHandler = require('../middlewares/jwtHandler');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwtHandler.verificarToken(token);
    req.user = decoded.usuario;
    next();
  } catch (error) {

    return res.redirect('/login');
  }
};

module.exports = { authenticateToken };