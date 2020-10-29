const fs = require ('fs')
const path = require('path')

const dbProducts = require('../data/dataBase')
const dbCategories = require('../data/dataBase');
//const dbCategories = require('../data/categories.json')

const {validationResult} = require('express-validator');
const db = require('../database/models');
const {Op} = require('sequelize')

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
                  console.log('El producto se guardo satisfactoriamente')
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
        db.Products.findByPk(req.params.id)
        .then(producto=>{
           res.render('productShow',{
            title: "Pa Que | Editar Producto",
            producto:producto,
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
        let errors = validationResult(req);
        db.Products.findByPk(req.params.id)
        if(errors.isEmpty()){
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
            }
      })
        .then(result=>{
          console.log('El producto fue actualizado')
            return res.redirect('/products')
        })
        .catch(errors => {
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
      }else{
        res.render('productShow',{
            title: "PaQue | Editar Producto",
            css: "style.css",
            usuario:req.session.usuario,
            errors:errors.mapped(),
            producto: db.Products.findByPk(req.params.id)
        })
      }
        
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
    },
    search: function(req, res) {
      let buscar = req.query.search.toLowerCase();
      db.Products.findAll({where:{
        descripcion:{
          [Op.substring]:buscar
      }
      }})
      .then(producto => {
      //res.send(producto)
      if(producto == 0){
        res.render('busqueda',{
         title: "Pa Que | Búsqueda",
         css:'style.css',
         msg: "¡¡¡¡Lo sentimos no tenemos nada relacionado con tu búsqueda!!!!",
         usuario:req.session.usuario
        })
      }else{
        res.render('busqueda',{
         title: "Pa Que | Búsqueda",
         css:'style.css',
         producto:producto,
         usuario:req.session.usuario
       })
      }
      })
      .catch(err => {
          res.send(err)
      })
       
   },
}