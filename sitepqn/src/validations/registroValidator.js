const {check,validatorResult,body} = require('express-validator');
const dbUsuarios = require('../data/usuarios');
const db = require('../database/models')

module.exports = [
    check('nombre')
    .isLength({
        min:2
    })
    .withMessage('Debes ingresar un nombre válido'),
    
    check('apellido')
    .isLength({
        min:2
    })
    .withMessage('Debes ingresar un apellido válido'),
    
    body('email')
    .custom(function(value){
        return db.Users.findOne({
            where:{
                email:value
            }
            })
            .then(user => {
                if(user){
                    return Promise.reject('Este mail ya está registrado')
                }
            })
     
    }),
    //.withMessage('Este email ya está registrado'),

    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    check('pass')// pass: '/^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/'
    .isLength({
        min:8,
        max:12,
       
    })
    .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

   /* check('pass')
    .isAlphanumeric(['es-ES'])
    .withMessage('La contraseña debe tener al menos una letra y un número'),*/

    body('pass2')
    .custom(function(value,{req}){
        if(value != req.body.pass){
            return false
        }
        return true
    })
    .withMessage('Las contraseñas no coinciden'),
    
    /*check('bases')
    .isString("on")
    .withMessage("Debe aceptar las bases y condiciones"),
*/
    body('avatar')
    .custom((value,{req})=>{
        if(req.fileValidationError){
            return false
        }else{
            return true
        }
    }).withMessage("Solo se permite png, jpg, jpeg, gif")
]