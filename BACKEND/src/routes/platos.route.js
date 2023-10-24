const { Router } = require('express');
const pool = require('../db')
const { getAllPlatos, getPlato, createPlato, deletePlato, editPlato } = require('../controllers/plato.controller');
const router = Router();



router.get('/platos', getAllPlatos)

router.get('/platos/:id', getPlato)

router.post('/platos', createPlato)

router.delete('/platos/:id', deletePlato)

router.put('/platos/:id', editPlato)

module.exports = router;