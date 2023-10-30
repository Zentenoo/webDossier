const { Router } = require('express');
const {  getProducto, createProducto, deleteProducto, editProducto, getAllProducto } = require('../controllers/producto.controller');
const router = Router();



router.get('/producto', getAllProducto)

router.get('/producto/:id', getProducto)

router.post('/producto', createProducto)

router.delete('/producto/:id', deleteProducto)

router.put('/producto/:id', editProducto)

module.exports = router;