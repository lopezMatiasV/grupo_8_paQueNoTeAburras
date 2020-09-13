const router = require('express').Router(); //en una misma línea requiere express, y ejecuta el metodo Router de express.
const multer =require ('multer');
const path = require ('path');
const sessionUserCheck = require('../middlewares/middlewareSessionUserCheck');

let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/products')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage});

//requerir el controlador
const controller = require('../controllers/productsController')

//utilizo los metodos del controller
router.get('/', controller.listar) 
router.get('/detalle/:id', controller.detalle)
router.get('/agregar', sessionUserCheck,controller.agregar)
router.post('/agregar',upload.any(), controller.publicar);
router.get('/show/:id/:flap?',sessionUserCheck,controller.show);
router.put('/edit/:id/:flap?',upload.any(),controller.edit);
router.delete('/delete/:id',controller.eliminar);

module.exports = router;