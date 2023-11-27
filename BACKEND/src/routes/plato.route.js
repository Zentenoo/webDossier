const { Router } = require('express');
const {  getPlato, createPlato, deletePlato, editPlato, getAllPlato } = require('../controllers/plato.controller');
const router = Router();


router.get('/plato', getAllPlato)

router.get('/plato/:id', getPlato)

router.post('/plato', createPlato)

router.delete('/plato/:id', deletePlato)

router.put('/plato/:id', editPlato)

module.exports = router;