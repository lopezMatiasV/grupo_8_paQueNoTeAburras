var express = require('express');
var router = express.Router();
//requiero el controller
let controller = require('../controllers/mainController')

/* GET home page. */
router.get('/', controller.index);
router.get('/registro', controller.registro)//llamo al metodo q necesito
router.get('/carrito', controller.carrito)
module.exports = router;
