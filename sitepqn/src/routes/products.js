const router = require('express').Router(); //en una misma línea requiere express, y ejecuta el metodo Router de express.
const path = require ('path');
const sessionUserCheck = require('../middlewares/middlewareSessionUserCheck');
const upImageProducts = require('../middlewares/middelwareUpImageProducts');
const productsValidator = require('../validations/productsValidator')
const showValidator = require('../validations/productsShowValidator')
const userAdmin = require('../middlewares/middlewareUserAdmin')



//requerir el controlador
const controller = require('../controllers/productsController')

//utilizo los metodos del controller
router.get('/', controller.listar) 
router.get('/detalle/:id', controller.detalle)
router.get('/agregar', userAdmin, controller.agregar)
router.post('/agregar',upImageProducts.any(), productsValidator, controller.publicar);
router.get('/show/:id/:flap?', userAdmin, controller.show);
router.put('/edit/:id/:flap?',upImageProducts.any(), showValidator,controller.edit);
router.delete('/delete/:id',controller.eliminar);
router.get('/search',controller.search); 
router.get('/prueba',controller.prueba)

module.exports = router;