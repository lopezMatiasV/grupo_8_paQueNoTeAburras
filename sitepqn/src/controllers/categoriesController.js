
const { render } = require('ejs')
const db = require('../database/models')

module.exports = {
    categorias: (req, res) => {
        db.Categories.findAll({
                include: [{
                    association: 'productos'
                },{
                  association : 'subcategorias'
                }]
            })
            .then(categorias => {
              //res.send(categorias)
                res.render('categorias', {
                  title: "Pa Que | Categoria",
                  categorias: categorias,
                  css: "style.css",
                  usuario: req.session.usuario,
        
                })
        
              }).catch(error => {
                res.send(error)
              })
    },
    category: (req, res) =>{
        db.Categories.findByPk(req.params.id,{
          include: [{
              association: 'productos'
          },{
            association : 'subcategorias'
          }]
      })
        .then(categoria => {
          //res.send(categoria)
            res.render('category', {
              title: "Pa Que | Category",
              categoria: categoria,
              css: "style.css",
              usuario: req.session.usuario
    
            })
    
          }).catch(error => {
            res.send(error)
          })
    }

}