const dbProducts = require('../data/dataBase')
const dbCategories = require('../data/categories.json')
const fs = require ('fs')
const path = require('path')

module.exports = {
    listar: function(req, res) {
        res.render('listar', {
            title: "Pa Que | Todos los productos",
            producto: dbProducts
        })
    },
    detalle: function(req, res){
        let idProduct = req.params.id; //ruta parametrizada en lenguaje express
         let producto = dbProducts.filter(producto=>{
            return producto.id == idProduct 
            })

        res.render('productos',{
            title:"Pa Que | Detalle del producto",
            producto:producto[0] //le colocamos así para que envíe a la vista un sólo elemento//
        })
    },
    agregar:(req, res)=>{
        res.render('carga',{
            title: "Pa Que | Agregar producto"
        })
    },
    publicar:(req, res)=>{
        let lastID = 1;
        dbProducts.forEach(producto=>{
            if(producto.id > lastID){
                lastID = producto.id
            }
        })
        let newProduct = {
            id:lastID + 1,
            sku:req.body.sku,
            nombre:req.body.nombre,
            precio:Number(req.body.precio),
            categoría:req.body.categoría,
            subcategoría:req.body.subcategoría,
            descripcion:req.body.descripcion,
            seccion:req.body.seccion,
            discount:Number(req.body.discount),
            img:(req.files[0])?req.files[0].filename:"default-image.png"
        }
        dbProducts.push(newProduct);
        
        fs.writeFileSync(path.join(__dirname,"..","data","dbProducts.json"),JSON.stringify(dbProducts),'utf-8')

        res.redirect('/products')
    }
}

