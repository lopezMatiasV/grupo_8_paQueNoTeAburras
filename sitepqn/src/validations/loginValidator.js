const db = require('../database/models')

const {check,validationResult,body} = require('express-validator');
const bcrypt = require('bcrypt');

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    check('pass')
    .isLength({
        min:1
    })
    .withMessage('Escribe tu contraseña'),

    body('pass')
    .custom((value,{req})=>{
        return db.Users.findOne({
            where:{
                email:req.body.email
            }
        })
        .then(usuario => {
            if(!bcrypt.compareSync(value,usuario.dataValues.pass)){ //si no machea la contraseña
                return Promise.reject('No coincide la contraseña')
            }
        })
        .catch(() => {
            return Promise.reject('Credenciales Inválidas')
        })
    })
     
]