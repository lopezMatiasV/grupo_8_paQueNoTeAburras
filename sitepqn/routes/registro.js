var express = require('express');
var router = express.Router();

//const controller = require('../controllers/registroController');
const sessionUserCheck = require('../middlewares/middlewareSessionUserCheck');

const upImageAvatar = require('../middlewares/middelwareUpImageAvatar');

const registroValidator = require('../validations/registroValidator');
const loginValidator = require('../validations/loginValidator');
const usersControllers = require('../controllers/registroControllers');

router.get('/',usersControllers.registro);
router.post('/',upImageAvatar.any(),registroValidator, usersControllers.processRegister);

router.get('/login',usersControllers.login);
router.post('/login',loginValidator,usersControllers.processLogin);

router.get('/profile',sessionUserCheck, usersControllers.profile);

router.get('/logout',usersControllers.logout);



module.exports = router;
