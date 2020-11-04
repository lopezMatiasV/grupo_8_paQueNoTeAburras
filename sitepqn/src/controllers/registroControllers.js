/************** BASES DE DATOS *************/

const db = require('../database/models')

/***************** MODULOS ************/

const {validationResult, body} = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const e = require('express');
const {
  Op
} = require('sequelize')

module.exports = {
    registro:function(req, res){
      res.render('registro', {
        title: "Pa Que | Registro",
        css: "registro.css"
      })        
    },
    processRegister:function(req,res){
       let errors = validationResult(req);
       
       if(errors.isEmpty()){

           db.Users.create({
            nombre: req.body.nombre.trim(),
            apellido: req.body.apellido.trim(),
            email:req.body.email.trim(),
            pass:bcrypt.hashSync(req.body.pass.trim(),10),
            avatar:(req.files[0])?req.files[0].filename:"default.png",
            rol:(req.session.usuario)?req.session.usuario:"usuario"
           })
           .then(result => {
            console.log(result)
            return res.redirect('/registro')
           })
           .catch(errores => {
            errors = {};
            errores.errors.forEach(error => {
              if(error.path == "nombre"){
                errors["nombre"] = {};
                errors["nombre"]["msg"] = error.message
              };
              if(error.path == "apellido"){
                errors["apellido"] = {};
                errors["apellido"]["msg"] = error.message
              };
              if(error.path == "email"){
                errors["email"] = {};
                errors["email"]["msg"] = error.message
              };
              if (error.path == "pass") {
                errors["pass"] = {};
                errors["pass"]["msg"] = error.message
              }
            })
          res.render('registro',{
                    title: "Pa Que | Registro",
                    css:"registro.css",
                    errors: errors,
                    old:req.body
         })
       
       })
         
    }
    else{
            (req.fileSave)?fs.unlinkSync(path.join(__dirname,'../../public/images/users/'+req.fileSave)):"";
             res.render('registro',{
                title: "Pa Que | Registro",
                css:"registro.css",
                errors: errors.mapped(),
                old:req.body
            })
        }
    },
    login:function(req,res){
        res.render('registro',{
            title:"Pa Que | login",
            css: "registro.css"
        })
    },
    processLogin:function(req,res){
       let url = '/';
       if(req.session.url){
        url = req.session.url
       }
       let errors = validationResult(req);
       if(errors.isEmpty()){

        db.Users.findOne({
          where:{
            email:req.body.email
          },
          
        })
        .then(usuario => {
          req.session.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            avatar: (usuario.rol == "usuario")?usuario.avatar:usuario.avatar,
            rol: usuario.rol
          }
          if(req.body.recordar){
            res.cookie('userPQNTA', req.session.usuario, {maxAge:1000*60*5})
          }
        res.locals.usuario = req.session.usuario
        return res.redirect(url)
        })
        .catch(error => { 
          res.send(error)
        })
       }else{
        res.render("registro",{
          title: "Pa Que | Registro",
          css: "registro.css",
          errors:errors.mapped(),
          old: req.body
         })
       }
    },
    profile:function(req,res){
      if (req.session.usuario) {
        db.Users.findByPk(req.session.usuario.id)
        .then(usuario => {
          console.log(usuario)
          res.render('userProfile', {
            title: "Pa Que | Perfil de Usuario",
            css: "style.css",
            usuario:usuario
          })
        })
      }else{
        res.redirect('/')
      }       
    },
    edit:function(req,res){
        db.Users.update(
            {
              nombre:req.body.nombre,
              apellido: req.body.apellido,
                dni: req.body.dni,
                avatar:(req.files[0])?req.files[0].filename:req.session.usuario.avatar,
                direccion: req.body.direccion.trim(),
                ciudad:req.body.ciudad,
                provincia:req.body.provincia,
                telefono:req.body.telefono
            },
            {
                where:{
                    id:req.params.id
                }
            }
        )
        .then( result => {
          console.log(req.session.usuario)

          return res.redirect('/registro/profile')
          })
        .catch(err => {
            console.log(err)
        })

    },
    eliminar:function(req,res){
        req.session.destroy();
        if (req.cookies.userPQNTA){
          res.cookie('userPQNTA','',{maxAge:-1});
        }
        db.Users.destroy({
          where:{
            id:req.params.id
          }
        })
        return res.redirect('/') 
    },
    logout:function(req,res){
        req.session.destroy();
        if(req.cookies.userPQNTA){
            res.cookie('userPQNTA','',{maxAge:-1})
        }
        return res.redirect('/')
    },
    admin: function(req, res){
      db.Users.findAll()
      .then(user => {
        console.log(user)
        res.render('admin', {
          title: "Pa Que | Administrador",
          css: "style.css",
          usuario:req.session.usuario,
          user: user
        })
      })
    },
    adminEdit: function(req, res){
      db.Users.update(
        {
          nombre:req.body.nombre,
          apellido: req.body.apellido,
          email: req.body.email,
          rol: req.body.rol
        },
        {
            where:{
                id:req.params.id
            }
        }
    )
    .then( result => {
      console.log(req.session.usuario)

      return res.redirect('/registro/administrador')
      })
    .catch(err => {
        console.log(err)
    })      
    },
    searchUsuario: function(req, res){
      let buscar = req.query.searchUsuario.toLowerCase();
      db.Users.findAll({
        where: {
          nombre: {
            [Op.substring]: buscar
          }
        }
      })
      .then(user => {
        //res.send(usuario)
        if (user == 0) {
          res.render('admin', {
            title: "Pa Que | Búsqueda",
            css: 'style.css',
            msg: "¡¡¡¡Lo sentimos no tenemos nada relacionado con tu búsqueda!!!!",
            usuario: req.session.usuario
          })
        } else {
          res.render('admin', {
            title: "Pa Que | Búsqueda",
            css: 'style.css',
            user: user,
            usuario: req.session.usuario
          })
        }
      })
      .catch(err => {
        res.send(err)
      })

  },
}