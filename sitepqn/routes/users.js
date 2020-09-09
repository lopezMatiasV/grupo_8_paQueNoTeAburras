var express = require('express');
var router = express.Router();

const controller = require('../controllers/usersController');
const sessionUserCheck = require('../middlewares/middlewareSessionUserCheck');

const upImageAvatar = require('../middlewares/midllewareUpImageAvatar');

const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');

router.get('/registro',controller.register);
router.post('/registro',upImageAvatar.any(),registerValidator, controller.processRegister);

router.get('/registro',controller.login);
router.post('/registro',loginValidator,controller.processLogin);

router.get('/profile',sessionUserCheck, controller.profile);

router.get('/logout',controller.logout);



module.exports = router;
