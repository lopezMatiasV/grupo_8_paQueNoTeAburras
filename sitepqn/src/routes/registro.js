var express = require('express');
var router = express.Router();
const path = require ('path');

const sessionUserCheck = require('../middlewares/middlewareSessionUserCheck');
const upImage = require('../middlewares/middelwareUpImageAvatar');

const registroValidator = require('../validations/registroValidator');
const loginValidator = require('../validations/loginValidator');
const usersControllers = require('../controllers/registroControllers');




router.get('/',usersControllers.registro);
router.post('/',upImage.any(),registroValidator, usersControllers.processRegister);

router.get('/login',usersControllers.login);
router.post('/login',loginValidator,usersControllers.processLogin);

router.get('/profile',sessionUserCheck, usersControllers.profile);
router.put('/edit/:id',upImage.any(),registroValidator,usersControllers.edit);
router.delete('/delete/:id',usersControllers.eliminar);
router.get('/logout',usersControllers.logout);



module.exports = router;
