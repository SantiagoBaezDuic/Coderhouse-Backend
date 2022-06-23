const { Router } = require('express');
const router = Router();
const { getProducts, addProduct } = require('../API/productsAPI.js');

router.get('/', getProducts);
router.post('/', addProduct);

module.exports = router; 