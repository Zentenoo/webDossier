const { Router } = require('express');
const { getUsuario, createUsuario, deleteUsuario, editUsuario, getAllUsuarios } = require('../controllers/usuario.controller');
const router = Router();

router.get('/usuario', getAllUsuarios);

router.get('/usuario/:id', getUsuario);

router.post('/usuario', createUsuario);

router.delete('/usuario/:id', deleteUsuario);

router.put('/usuario/:id', editUsuario);

module.exports = router;
