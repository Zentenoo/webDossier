const { Router } = require('express');
const { getAllConsumos, getConsumoById, createConsumo, deleteConsumoById, updateConsumoById } = require('../controllers/consumo.controller');
const router = Router();


router.get('/consumo', getAllConsumos)

router.get('/consumo/:id', getConsumoById)

router.post('/consumo', createConsumo)

router.delete('/consumo/:id', deleteConsumoById)

router.put('/consumo/:id', updateConsumoById
)

module.exports = router;