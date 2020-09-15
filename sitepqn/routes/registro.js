var express = require('express');
var router = express.Router();

const sessionUserCheck = require('../middlewares/middlewareSessionUserCheck');
const multer =require ('multer');
const upImageAvatar = require('../middlewares/middelwareUpImageAvatar');

const registroValidator = require('../validations/registroValidator');
const loginValidator = require('../validations/loginValidator');
const usersControllers = require('../controllers/registroControllers');
let storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'public/images/products')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage});

router.get('/',usersControllers.registro);
router.post('/',upImageAvatar.any(),registroValidator, usersControllers.processRegister);

router.get('/login',usersControllers.login);
router.post('/login',loginValidator,usersControllers.processLogin);

router.get('/profile',sessionUserCheck, usersControllers.profile);
router.put('/edit/:id',upload.any(),usersControllers.edit);
//router.delete('/delete/:id',usersControllers.eliminar);
router.get('/logout',usersControllers.logout);



module.exports = router;
