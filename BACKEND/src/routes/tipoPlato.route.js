const { Router } = require('express');
const { getAllTipoPlato, getTipoPlato, createTipoPlato, deleteTipoPlato, editTipoPlato } = require('../controllers/tipoPlato.controller');
const router = Router();



router.get('/tipo_plato', getAllTipoPlato)

router.get('/tipo_plato/:id', getTipoPlato)

router.post('/tipo_plato', createTipoPlato)

router.delete('/tipo_plato/:id', deleteTipoPlato)

router.put('/tipo_plato/:id', editTipoPlato)

module.exports = router;