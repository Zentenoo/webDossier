const { Router } = require('express');
const {  getAllReserva,getReserva,createReserva,editEstadoReserva } = require('../controllers/reserva.controller');
const router = Router();



router.get('/reserva', getAllReserva)

router.get('/reserva/:id', getReserva)

router.post('/reserva', createReserva)

router.put('/reserva/:id', editEstadoReserva)

module.exports = router;