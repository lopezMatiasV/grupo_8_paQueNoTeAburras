/************** BASES DE DATOS *************/
//const dbProductos = require('../data/database');
//const dbUsuarios = require('../data/usuarios.json');
const db = require('../database/models')

/***************** MODULOS ************/

const {validationResult, body} = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const e = require('express');

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
            rol:(req.session.usuario)?req.session.usuario:"user"
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
            css: "registro.css",
            usuario:req.session.usuario
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
        .then(user => {
          req.session.user = {
            id: user.id,
            nick: user.nombre + " " + user.apellido,
            email: user.email,
            avatar: (user.rol == "user")?user.avatar:user.avatar,
            rol: user.rol
          }
          if(req.body.recordar){
            res.cookie('UsuarioPaQueNo', req.session.user, {maxAge:1000*60*5})
          }
        res.locals.user = req.session.user
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
      if (req.session.user) {
        db.Users.findByPk(req.session.user.id)
        .then(user => {
          console.log(user)
          res.render('userProfile', {
            title: "Perfil de Usuario",
            css: "style.css",
            usuario:user,
            productos: dbProductos.filter(producto => {
              return producto.categoria != "visited" & producto.categoria != "in-sale"
            })
          })
        })
      }else{
        res.redirect('/')
      }       
    },
    edit:function(req,res){
       if(req.files[0]){
        if(fs.existsSync(path.join(__dirname,'../../public/images/users' + req.session.user.avatar))){
          fs.unlinkSync(path.join(__dirname, '../../public/images/user' + req.session.user.avatar))
          res.locals.user.avatar = req.files[0].filename
        }

       }
       db.Users.editar(
       {
        fecha: req.body.fecha,
        avatar: (req.files[0])?req.files[0].filename:req.session.user.avatar,
        direccion: req.body.direccion,
        ciudad:req.body.ciudad,
        provincia:req.body.provincia
       },
       {
        where:{
          id:req.params.id
           }    
         
         }
       
       )
       .then(result => {
        console.log(req.session.user)
        return res.redirect('/registro/profile')
       })
       .catch(err => {
        console.log(err)
       })
    },
    eliminar:function(req,res){
        let idUsuario = req.params.id
        idUsuario = parseInt(idUsuario)
        let filtro = dbUsuarios.filter(usuario => {
            return usuario.id != idUsuario; 
        })
        fs.writeFileSync(path.join(__dirname, '../data/usuarios.json'), JSON.stringify(filtro), 'utf-8');
        res.redirect('/')
    },
    logout:function(req,res){
        req.session.destroy();
        if(req.cookies.userPQNTA){
            res.cookie('userPQNTA','',{maxAge:-1})
        }
        return res.redirect('/')
    }
}