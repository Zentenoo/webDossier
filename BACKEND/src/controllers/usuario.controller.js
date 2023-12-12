const Usuario = require('../models/usuario.model');
const jwtHandler = require('../middlewares/jwtHandler')

const loginUsuario = async (req, res, next) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findByEmailAndPassword(correo, contraseña);

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    if (!usuario.esadmin) {
        return res.status(401).json({ message: 'No tienes permisos' });
      }
    const token = jwtHandler.crearToken({ usuario });
    res.json({ token });

  } catch (error) {
    next(error);
  }
};

const registerUsuario = async (req, res, next) => {
  const {
    nombre,
    contraseña,
    apellido,
    telefono,
    correo,
    foto
  } = req.body;

  try {
    const usuario = await Usuario.register(
      nombre,
      contraseña,
      apellido,
      telefono,
      correo,
      foto,
      true,
      false,
      false
    );

    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

const getAllUsuarios = async (req, res, next) => {
    try {
        const allUsuarios = await Usuario.getAll();
        res.json(allUsuarios);
    } catch (error) {
        next(error);
    }
};

const getUsuarioById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.getById(id);
    if (!usuario) {
      return res.status(404).json({ message: 'El usuario no existe' });
    }
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

const updateUsuario = async (req, res, next) => {
    const { id } = req.params;
    const {
      nombre,
      contraseña,
      apellido,
      telefono,
      correo,
      estado,
      esadmin,
      esanfitrion,
      foto
    } = req.body;
  
    try {
      const updatedUser = await Usuario.update(
        id,
        nombre,
        contraseña,
        apellido,
        telefono,
        correo,
        estado,
        esadmin,
        esanfitrion,
        foto
      );
  
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  const deleteUsuarioById = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const deletedUser = await Usuario.deleteById(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'El usuario no existe' });
      }
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  loginUsuario,
  registerUsuario,
  updateUsuario,
  deleteUsuarioById
};