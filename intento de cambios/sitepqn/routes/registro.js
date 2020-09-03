const express = require('express');
const router = express.Router();

//requiero al controlador
const controller = require('../controllers/registroController')

/*registro*/
router.get('/', controller.registro)//llamo al metodo q necesito

module.exports = router;