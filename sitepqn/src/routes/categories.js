const router = require('express').Router();
const controller = require('../controllers/categoriesController')

router.get('/', controller.categorias);
router.get('/:id', controller.category)

module.exports = router;