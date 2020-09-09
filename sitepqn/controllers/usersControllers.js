let dbProductos = require('../data/dataBase');
let dbUsuarios = require('../data/dbUsuarios');

const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

module.exports = {
    register:function(req,res){
        res.render('userRegister',{
            title:"Registro de Usuario",
            css: "registro.css"
        })
    },
    processRegister:function(req,res){
       let errors = validationResult(req);
       let lastID = dbUsuarios.length;
       if(errors.isEmpty()){
           let nuevoUsuario = {
               id:lastID +1,
               nombre: req.body.nombre,
               apellido: req.body.apellido,
               email: req.body.email,
               avatar: req.files[0].filename,
               pass:bcrypt.hashSync(req.body.pass,10),
               rol:"user"
           };
           dbUsuarios.push(nuevoUsuario);
           fs.writeFileSync(path.join(__dirname,'..','data','dbUsuarios.json'),JSON.stringify(dbUsuarios),'utf-8');
           return res.redirect('/users/login');
       }else{
           res.render('userRegister',{
            title:"Registro de Usuario",
            css: "registro.css",
            errors:errors.mapped(),
            old:req.body
           })
       }
    },
    login:function(req,res){
        res.render('userLogin',{
            title:"Ingresá a tu cuenta",
            css: "registro.css",
            usuario:req.session.usuario
        })
    },
    processLogin:function(req,res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
            dbUsuarios.forEach(usuario => {
                if(usuario.email == req.body.email){
                    req.session.usuario = {
                        id:usuario.id,
                        nick:usuario.nombre + " " + usuario.apellido,
                        email:usuario.email,
                        avatar:usuario.avatar
                    }
                }
            });
            if(req.body.recordar){
                res.cookie('userPQNTA',req.session.usuario,{maxAge:1000*60*10})
            }
            res.redirect('/')
        }else{
            res.render('userLogin',{
                title:"Ingresá a tu cuenta",
                css: "registro.css",
                errors:errors.mapped(),
                old:req.body,
                usuario:req.session.usuario
               })
        }
    },
    profile:function(req,res){
        res.render('userProfile',{
            title: "Perfil de usuario",
            productos:dbProductos.filter(producto=>{
                return producto.categoria != "visitadas" && producto.categoria != "ofertas"
            }),
            css:"profile.css",
            usuario:req.session.usuario

        })
    },
    logout:function(req,res){
        req.session.destroy();
        if(req.cookies.userPQNTA){
            res.cookie('userPQNTA','',{maxAge:-1})
        }
        return res.redirect('/')
    }
}