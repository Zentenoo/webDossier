const { Router } = require('express');
const { getAllTipoPlato, getTipoPlato, createTipoPlato, deleteTipoPlato, editTipoPlato } = require('../controllers/tipoPlato.controller');
const router = Router();



router.get('/tipo_platos', getAllTipoPlato)

router.get('/tipo_platos/:id', getTipoPlato)

router.post('/tipo_platos', createTipoPlato)

router.delete('/tipo_platos/:id', deleteTipoPlato)

router.put('/tipo_platos/:id', editTipoPlato)

module.exports = router;