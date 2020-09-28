var express = require('express');
var router = express.Router();
//requiero el controller
let controller = require('../controllers/mainController')
const cookieCheck = require('../middlewares/middlewareCookieCheck')

/* GET home page. */
router.get('/', cookieCheck, controller.index);
router.get('/buscar', controller.search)
router.get('/carrito', controller.carrito)
module.exports = router;
