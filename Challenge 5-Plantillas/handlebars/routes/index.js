const { Router } = require(`express`);
const router = Router();
const productRoutes = require('./productRoutes');

router.get(`/`, (req, res) => {
    res.render(`base`);
})

router.use('/productos', productRoutes);

module.exports = router;