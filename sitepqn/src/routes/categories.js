const router = require('express').Router();
const controller = require('../controllers/categoriesController')

router.get('/', controller.categorias) 

module.exports = router;