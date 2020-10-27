let db = require('../database/models')

const {check,validationResult,body} = require('express-validator');

module.exports = [
    check('sku')
    .isInt({
        min:6
    })
    .withMessage('Tenés que indicar el código del producto'),

    check('nombre')
    .isLength({
        min:1
    })
    .withMessage('Tenés que colocar un nombre al producto'),

    check('precio')
    .isInt({
        min:1
    })
    .withMessage('No colocaste un valor válido'),

    check('descuento')
    .isInt({
        min:1
    })
    .withMessage('No colocaste un descuento válido'),

    check('descripcion')
    .isLength({
        min:1
    })
    .withMessage('Debes colocar una descripcion del producto'),

    body('foto')
    .custom((value,{req})=>{
        if(!req.files[0]){
            return false
        }else{
            return true
        }
    })
    .withMessage("Tenés que subir una imagen"),

    check('categoria')
    .isLength({
        min:1
    })
    .withMessage('La categoria del producto es obligatoria')

]