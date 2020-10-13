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
        db.Products.findByPk(req.params.id)
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
    },
    agregar:function(req,res){
       db.Products.findAll({

       })
       .then(productos=>{
           res.render('carga',{
               title: "PaQue | Agregar",
               css: "style.css",
               usuario:req.session.usuario,
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
                descuento:Number(req.body.descuento),
                descripcion:req.body.descripcion,
                fotos:req.files[0].filename,
                categoria:req.body.categoria,
                subcategoria:req.body.subcategoria
                })
                .then(result => {
                    console.log(result)
                    res.redirect('/products/agregar')
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
        db.Products.findByPk(req.params.id)
        .then(producto=>{
           res.render('productShow',{
            title: "Editar Producto",
            producto:producto,
            total:db.Products.length,
            activeDetail: activeDetail,
            activeEdit: activeEdit,
            showDetail:showDetail,
            showEdit:showEdit,
            css:"style.css",
            usuario:req.session.usuario 
        })
        })
        .catch(err => {
            res.send(err)
        })
    },
    edit:function(req,res){
        let idNewProduct = req.params.id;
        db.Products.update({
            sku : req.body.sku,
            nombre : req.body.nombre.trim(),            
            descripcion : req.body.descripcion,
            precio : Number(req.body.precio),
            categoria : req.body.categoria,
            subcategoria : req.body.subcategoria,
            seccion : req.body.seccion,
            fotos : (req.files[0]) ? req.files[0].filename : idNewProduct.fotos,
            descuento : Number(req.body.descuento)
        },
        {
            where:{
            id:req.params.id
        }}
        )
        .then(result=>{
            return res.redirect('/products')
        })
        .catch(error=>{
            console.log(error)
        })
    },
    eliminar:function(req,res){
        db.Products.destroy({
            where:{
                id:req.params.id
            }
        })
        return res.redirect('/products')
    }
}