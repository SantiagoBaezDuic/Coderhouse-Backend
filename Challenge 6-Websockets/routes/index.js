const { Router } = require(`express`);
const router = Router();
const { addProduct } = require(`../API/productAPI.js`);

router.post(`/productos`, addProduct);

module.exports = router;