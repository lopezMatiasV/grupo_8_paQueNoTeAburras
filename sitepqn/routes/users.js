var express = require('express');
var router = express.Router();

const controller = require('../controllers/usersControllers');
const sessionUserCheck = require('../middlewares/middlewareSessionUserCheck');

const upImageAvatar = require('../middlewares/middelwareUpImageAvatar');

const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const usersControllers = require('../controllers/usersControllers');

router.get('/registro',controller.register);
router.post('/registro',upImageAvatar.any(),registerValidator, usersControllers.processRegister);

router.get('/registro',usersControllers.login);
router.post('/registro',loginValidator,usersControllers.processLogin);

router.get('/profile',sessionUserCheck, usersControllers.profile);

router.get('/logout',usersControllers.logout);



module.exports = router;
