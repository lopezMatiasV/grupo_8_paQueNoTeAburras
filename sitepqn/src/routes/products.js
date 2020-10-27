const router = require('express').Router(); //en una misma línea requiere express, y ejecuta el metodo Router de express.
const path = require ('path');
const sessionUserCheck = require('../middlewares/middlewareSessionUserCheck');
const upImageProducts = require('../middlewares/middelwareUpImageProducts');
const productsValidator = require('../validations/productsValidator')



//requerir el controlador
const controller = require('../controllers/productsController')

//utilizo los metodos del controller
router.get('/', controller.listar) 
router.get('/detalle/:id', controller.detalle)
router.get('/agregar', sessionUserCheck, controller.agregar)
router.post('/agregar',upImageProducts.any(), productsValidator, controller.publicar);
router.get('/show/:id/:flap?', sessionUserCheck, controller.show);
router.put('/edit/:id/:flap?',upImageProducts.any(), productsValidator,controller.edit);
router.delete('/delete/:id',controller.eliminar);

module.exports = router;