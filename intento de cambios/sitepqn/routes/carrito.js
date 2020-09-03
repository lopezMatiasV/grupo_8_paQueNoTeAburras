const express = require('express');
const router = express.Router();

//requiero al controlador
const controller = require('../controllers/carritoController')

/*carrito*/
router.get('/', controller.carrito)//llamo al metodo q necesito

module.exports = router;