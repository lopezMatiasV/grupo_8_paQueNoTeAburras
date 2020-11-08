const db = require('../database/models')
let dbProducts = require('../data/dataBase');
const {
  Op
} = require('sequelize')

module.exports = {
    index: (req, res)=> {
      db.Products.findAll({
        include: [{association: "categorias"},{association : 'subcategorias'}],
      where: {
        seccion: "Ofertas"
      }
      })
      .then(productosOfertas=>{
        db.Products.findAll({
        include: [{association: "categorias"},{association : 'subcategorias'}],
      where: {
        seccion: "Campaña"
      }
      })
      .then(productosCampaña =>{
        res.render('index', {
          title: 'Pa q no te aburras',
          css:"style.css",
          productosCampaña:productosCampaña,
          productosOfertas:productosOfertas,
          usuario:req.session.usuario
      })
    })
    })
  },
  nosotros:(req,res)=>{
    res.render('nosotros',{
      title:"Pa Que | About",
      css:"stylesNosotros.css",
      usuario:req.session.usuario

    })
  },
    carrito:(req, res)=>{
        res.render('carrito',{
          title:"Pa Que | Carrito",
          css:"carrito.css",
          usuario:req.session.usuario

        })
    }
  
}
