const { Router } = require('express');
const { getAllServPlato, getServPlato, createServPlato, deleteServPlato, editServPlato } = require('../controllers/servplato.controller');
const router = Router();



router.get('/servplato', getAllServPlato)

router.get('/servplato/:id', getServPlato)

router.post('/servplato', createServPlato)

router.delete('/servplato/:id', deleteServPlato)

router.put('/servplato/:id', editServPlato)

module.exports = router;