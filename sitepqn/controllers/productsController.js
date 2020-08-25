const dbProducts = require('../data/dataBase')
/*const dbCategories = require('../data/categories.json')
const fs = require ('fs')
const path = require('path')*/

module.exports = {
    listar:(req, res)=>{
        res.send(dbProducts)
    },
    detalle: (req, res)=>{
        res.render('productos',{
            title:"Detalle del producto"
        })
    }
}