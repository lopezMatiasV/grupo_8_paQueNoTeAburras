const router = require('express').Router(); //en una misma línea requiere express, y ejecuta el metodo Router de express.

/*const multer =require ('multer');
const path = require ('path');*/

//requerir el controlador
const controller = require('../controllers/productsController')

//utilizo los metodos del controller
router.get('/', controller.listar)
router.get('/:id', controller.detalle)



module.exports = router;