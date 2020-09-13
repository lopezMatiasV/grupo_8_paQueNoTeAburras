const dbProductos = require('../data/dataBase');
const dbUsuarios = require('../data/usuarios');

const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

module.exports = {
    registro:(req, res)=>{
        res.render('registro',{
          title:"Pa Que | Registro",
          css:"registro.css"

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
           fs.writeFileSync(path.join(__dirname,'..','data','usuarios.json'),JSON.stringify(dbUsuarios),'utf-8');
           return res.redirect('/registro');
       }else{
           res.render('registro',{
            title:"Pa Que | Registro",
            css: "registro.css",
            errors:errors.mapped(),
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
        let errors = validationResult(req);
        if(errors.isEmpty()){
            dbUsuarios.forEach(usuario => {
                if(usuario.email == req.body.email){
                    req.session.usuario = {
                        id:usuario.id,
                        nombre:usuario.nombre,
                        apellido: usuario.apellido,
                        direccion:usuario.direccion,
                        telefono: usuario.telefono,
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
            res.render('registro',{
                title:"Pa Que | login",
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
            css:"style.css",
            usuario:req.session.usuario

        })
    },
   /* edit:function(req,res){
        let idUsuario = req.params.usuario.id;

        dbUsuario.forEach(usuario => {
            if (usuario.id == idUsuario) {
                usuario.id = Number(req.body.id);
                usuario.nombre = req.body.nombre;
                usuario.apellido = req.body.apellido;
                usuario.email = req.body.email;                
                usuario.domicilio = req.body.domicilio;
                usuario.telefono = Number(req.body.telefono);
                usuario.avatar = (req.files[0]) ? req.files[0].filename : usuario.avatar          
            }
        })

        fs.writeFileSync(path.join(__dirname, '../data/dbUsuarios.json'), JSON.stringify(dbUsuarios))
        res.redirect('/register/profile')
    },
    eliminar:function(req,res){
        let idUsuario = req.params.id
        idUsuario = parseInt(idUsuario)
        let filtro = dbUsuario.filter(usuario => {
            return usuario.id != idUsuario; 
        })
        fs.writeFileSync(path.join(__dirname, '../data/dbUsuarios.json'), JSON.stringify(filtro), 'utf-8');
        res.redirect('/')
    },*/
    logout:function(req,res){
        req.session.destroy();
        if(req.cookies.userPQNTA){
            res.cookie('userPQNTA','',{maxAge:-1})
        }
        return res.redirect('/')
    }
}