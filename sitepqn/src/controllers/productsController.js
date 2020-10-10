const fs = require ('fs')
const path = require('path')

const dbProducts = require('../data/dataBase')
const dbCategories = require('../data/dataBase');
//const dbCategories = require('../data/categories.json')

const {validationResult} = require('express-validator');
const db = require('../database/models');
const { brotliDecompress } = require('zlib');

module.exports = {
    listar: function(req, res) {
        db.Products.findAll()
            .then(producto=>{
                res.render('listar', {
                    title: "Pa Que | Todos los productos",
                    css:"style.css",
                    producto:producto,
                    usuario:req.session.usuario
                })
            }).catch(error=>{
                res.send(error)
            })
    },            
    detalle: function(req, res){
        db.Products.findOne()
        .then(producto=>{
            res.render('productos',{
                title:"Pa Que | Detalle del producto",
                producto:producto,
                css: "styleDetalleProducto.css",
                usuario:req.session.usuario
    
            })
            
        }).catch(error=>{
            res.send(error)
        })
       /* let idProduct = req.params.id; //ruta parametrizada en lenguaje express
         let producto = dbProducts.filter(producto=>{
            return producto.id == idProduct 
            })

        res.render('productos',{
            title:"Pa Que | Detalle del producto",
            producto:producto[0],//le colocamos así para que envíe a la vista un sólo elemento//
            css: "styleDetalleProducto.css",
            usuario:req.session.usuario

        })*/
    },
    agregar:function(req,res){
       db.Products.findAll({

       })
       .then(productos=>{
           res.render('carga',{
               title: "PaQue | Agregar",
               css: "style.css",
               productos: productos
           })
           
       })
       .catch(error=>{
        res.send(error)
    })
    },
    publicar:function(req,res,next){
        let errores = validationResult(req);

        if(errores.isEmpty()){
            db.Products.create({
                sku:req.body.sku,
                nombre:req.body.nombre.trim(),
                precio:Number(req.body.precio),
                seccion:req.body.seccion.trim(),
                descuento:Number(req.body.discount),
                descripcion:req.body.descripcion,
                fotos:req.files[0].filename,
                categoria:req.body.categoria,
                subcategoria:req.body.subCategoria
                })
                .then(result => {
                    console.log(result)
                    res.redirect('/products')
                })
                .catch(err => {
                    res.send(err)
                })
            
            .catch(err => {
                res.send(err)
            })
        }else{
            db.Categories.findAll({
                order:[
                    'nombre'
                ]
            })
            .then(categorias => {
                let oldCategoria;
                if(req.body.categoria){
                    categorias.forEach(categoria => {
                        if(categoria.id == req.body.categoria){
                            oldCategoria = categoria.nombre
                        }
                    });
                }
                res.render('productAdd', {
                    title: "Agregar Producto",
                    css:'product.css',
                    categorias: categorias,
                    usuario:req.session.usuario,
                    errors: errores.mapped(),
                    old:req.body,
                    oldCategoria:oldCategoria
                }) 
            })
            .catch(err => {
                res.send(err)
            })
        }
    },
    show:function(req,res){
        db.Products.findOne(/*{
            where:{
                producto:db.Products.producto
            }
        }*/)
        
        .then(product => {
            res.render('productShow',{
                title: "Pa Que || Editar Producto",
                producto:db.Products.producto,
                css:"style.css",
              //usuario:req.session.usuario
    
            })
          })
          .catch(err => {
            res.send(err)
        })

        /*
        let idProducto = req.params.id;
        let flap = req.params.flap;

        let activeDetail;
        let activeEdit;
        let showDetail;
        let showEdit;

        if(flap == "show"){
            activeDetail = "active";
            showDetail = "show"
        }else{
            activeEdit = "active";
            showEdit = "show";
        } 

        let resultado = dbProducts.filter(producto=>{
            return producto.id == idProducto
        })

        res.render('productShow',{
            title: "Editar Producto",
            producto:resultado[0],
            total:dbProducts.length,
            categoria:dbProducts,
            activeDetail: activeDetail,
            activeEdit: activeEdit,
            showDetail:showDetail,
            showEdit:showEdit,
            css:"style.css",
            usuario:req.session.usuario

        })*/
    },
    edit:function(req,res){
        let idProducto = req.params.id;

        dbProducts.forEach(producto => {
            if (producto.id == idProducto) {
                producto.id = Number(req.body.id);
                producto.nombre = req.body.nombre;
                producto.sku = req.body.sku;
                producto.descripcion = req.body.descripcion;
                producto.precio = Number(req.body.precio);
                producto.categoria = req.body.categoria;
                producto.subCategoria = req.body.subCategoria;
                producto.seccion = req.body.seccion;
                producto.img = (req.files[0]) ? req.files[0].filename : producto.img
                producto.discount = Number(req.body.discount);            
            }
        })

        fs.writeFileSync(path.join(__dirname, '../data/dbProducts.json'), JSON.stringify(dbProducts))
        res.redirect('/products/show/' + idProducto)
    },
    eliminar:function(req,res){
        let idProducto = req.params.id
        idProducto = parseInt(idProducto)
        let filtro = dbProducts.filter(producto => {
            return producto.id != idProducto; 
        })
        fs.writeFileSync(path.join(__dirname, '../data/dbProducts.json'), JSON.stringify(filtro), 'utf-8');
        res.redirect('/products')
    }
}