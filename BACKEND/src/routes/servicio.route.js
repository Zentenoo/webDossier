const { Router } = require('express');
const { getServicio, createServicio, deleteServicio, editServicio, getAllServicios } = require('../controllers/servicio.controller');
const router = Router();

router.get('/servicio', getAllServicios)

router.get('/servicio/:id', getServicio)

router.post('/servicio', createServicio)

router.delete('/servicio/:id', deleteServicio)

router.put('/servicio/:id', editServicio)

module.exports = router;
