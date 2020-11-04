
const db = require('../database/models')

module.exports = {
    categorias: (req, res) => {
        db.Categories.findAll({
                include: [{
                    association: 'subcategorias'
                }]
            })
            .then(categoria => {
                res.render('categoria', {
                  title: "Pa Que | Categoria",
                  categoria: categoria,
                  css: "styleDetalleProducto.css",
                  usuario: req.session.usuario
        
                })
        
              }).catch(error => {
                res.send(error)
              })
    },
    muñecas: (req, res) =>{
        db.Categories.findAll()
        .then(categorias => {
            res.render('categoria', {
              title: "Pa Que | Categoria",
              categorias: categorias,
              css: "styleDetalleProducto.css",
              usuario: req.session.usuario
    
            })
    
          }).catch(error => {
            res.send(error)
          })
    }

}