const express = require ('express');
const router = express.Router();
/*const multer =require ('multer');
const path = require ('path');*/

//requerir el controlador
const controller = require('../controllers/productsController')

//utilizo los metodos del controller
router.get('/', controller.listar)
router.get('/detalle/:id', controller.detalle)



module.exports = router;