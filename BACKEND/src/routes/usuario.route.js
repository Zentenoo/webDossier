const { Router } = require('express');
const usuarioController = require('../controllers/usuario.controller'); 
const router = Router();


router.get('/usuario', usuarioController.getAllUsuarios);

router.get('/usuario/:id', usuarioController.getUsuarioById);

router.delete('/usuario/:id', usuarioController.deleteUsuarioById);

router.put('/usuario/:id', usuarioController.updateUsuario);

router.post('/login', usuarioController.loginUsuario);

router.post('/register', usuarioController.registerUsuario);

module.exports = router;
