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
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.Products.create({
                sku:req.body.sku,
                nombre:req.body.nombre.trim(),
                precio:Number(req.body.precio),
                seccion:req.body.seccion.trim(),
                descuento:Number(req.body.descuento),
                descripcion:req.body.descripcion,
                fotos:(req.files[0])?req.files[0].filename:"default.png",
                categoria:req.body.categoria,
                subcategoria:req.body.subcategoria
                })
                .then(result => {
                    console.log(result)
                    res.redirect('/products/agregar')
                })            
                .catch(errors => {
                    errors = {};
                    errors.errors.forEach(error => {
                      if(error.path == "sku"){
                        errors["sku"] = {};
                        errors["sku"]["msg"] = error.message
                      };
                      if(error.path == "nombre"){
                        errors["nombre"] = {};
                        errors["nombre"]["msg"] = error.message
                      };
                      if(error.path == "precio"){
                        errors["precio"] = {};
                        errors["precio"]["msg"] = error.message
                      };
                      if (error.path == "categoria") {
                        errors["categoria"] = {};
                        errors["categoria"]["msg"] = error.message
                      };
                      if (error.path == "subcategoria") {
                        errors["subcategoria"] = {};
                        errors["subcategoria"]["msg"] = error.message
                      };
                      if (error.path == "seccion") {
                        errors["seccion"] = {};
                        errors["seccion"]["msg"] = error.message
                      };
                      if (error.path == "discount") {
                        errors["discount"] = {};
                        errors["discount"]["msg"] = error.message
                      };
                      if (error.path == "descripcion") {
                        errors["descripcion"] = {};
                        errors["descripcion"]["msg"] = error.message
                      };
                      if (error.path == "foto") {
                        errors["foto"] = {};
                        errors["foto"]["msg"] = error.message
                      };
                    })
                    res.render('carga',{
                        title: "PaQue | Agregar",
                        css: "style.css",
                        usuario:req.session.usuario,
                        productos: productos
                    })
               
               })
        }else{
          res.render('carga',{
            title: "PaQue | Agregar",
            css: "style.css",
            usuario:req.session.usuario,
            errors:errors.mapped()
        })
      }
    },
    show:function(req,res){
        let idProducto = req.params.id;
       /* let flap = req.params.flap;

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
        } */
        db.Products.findByPk(req.params.id)
        .then(producto=>{
           res.render('productShow',{
            title: "Pa Que | Editar Producto",
            producto:producto,
            /*total:db.Products.length,
            activeDetail: activeDetail,
            activeEdit: activeEdit,
            showDetail:showDetail,
            showEdit:showEdit,*/
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
        .catch(errores => {
            errors = {};
            errores.errors.forEach(error => {
              if(error.path == "sku"){
                errors["sku"] = {};
                errors["sku"]["msg"] = error.message
              };
              if(error.path == "nombre"){
                errors["nombre"] = {};
                errors["nombre"]["msg"] = error.message
              };
              if(error.path == "precio"){
                errors["precio"] = {};
                errors["precio"]["msg"] = error.message
              };
              if (error.path == "categoria") {
                errors["categoria"] = {};
                errors["categoria"]["msg"] = error.message
              };
              if (error.path == "subcategoria") {
                errors["subcategoria"] = {};
                errors["subcategoria"]["msg"] = error.message
              };
              if (error.path == "seccion") {
                errors["seccion"] = {};
                errors["seccion"]["msg"] = error.message
              };
              if (error.path == "discount") {
                errors["discount"] = {};
                errors["discount"]["msg"] = error.message
              };
              if (error.path == "descripcion") {
                errors["descripcion"] = {};
                errors["descripcion"]["msg"] = error.message
              };
              if (error.path == "foto") {
                errors["foto"] = {};
                errors["foto"]["msg"] = error.message
              };
            })
            res.render('show',{
                title: "PaQue | Editar Producto",
                css: "style.css",
                usuario:req.session.usuario,
                productos: productos
            })
       
       })
    },
    eliminar:function(req,res){
        db.Products.destroy({
            where:{
                id:req.params.id
            }
        })
        .then(result=>{
          return res.redirect('/products')
      })
    }
}