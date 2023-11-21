const { Router } = require('express');
const { getUsuario, createUsuario, deleteUsuario, editUsuario, getAllUsuarios, loginUsuario, registerUsuario } = require('../controllers/usuario.controller');
const router = Router();

router.get('/usuario', getAllUsuarios);

router.get('/usuario/:id', getUsuario);

router.post('/usuario', createUsuario);

router.delete('/usuario/:id', deleteUsuario);

router.put('/usuario/:id', editUsuario);

router.post('/login', loginUsuario);
router.post('/register', registerUsuario);

module.exports = router;
