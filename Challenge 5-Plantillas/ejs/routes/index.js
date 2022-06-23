const { Router } = require(`express`);
const router = Router();
const productRoutes = require('./productRoutes');

router.get(`/`, (req, res) => {
    try {
        res.render('pages/index');
    } catch (error) {
        console.log(`Ocurrio un error: ${error}`);
        res.sendStatus(500);
    }
})

router.use('/productos', productRoutes);

module.exports = router;