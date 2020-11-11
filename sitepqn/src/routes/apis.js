const router = require('express').Router();
const apisController = require('../controllers/apisController')

router.get('/categorias', apisController.categorias);
router.get('/subcategorias/:id', apisController.subcategorias)

module.exports = router;