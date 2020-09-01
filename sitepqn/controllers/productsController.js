const dbProducts = require('../data/dataBase')
/*const dbCategories = require('../data/categories.json')
const fs = require ('fs')
const path = require('path')*/

module.exports = {
    listar: function(req, res) {
        res.render('listar', {
            title: "Todos los productos",
            producto: dbProducts
        })
    },
    detalle: function(req, res){
        let idProduct = req.params.id; //ruta parametrizada en lenguaje express
         let producto = dbProducts.filter(producto=>{
            return producto.id == idProduct 
            })

        res.render('productos',{
            title:"Detalle del producto",
            producto:producto[0] //le colocamos así para que envíe a la vista un sólo elemento//
        })
    }
}

