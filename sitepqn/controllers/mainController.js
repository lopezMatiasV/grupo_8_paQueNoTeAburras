let dbProducts = require('../data/dataBase');

module.exports = {
    index: (req, res, next)=> {
      let ofertas = dbProducts.filter(producto=>{
        return producto.seccion == 'ofertas'
      })
      let visitadas = dbProducts.filter(producto=>{
        return producto.seccion == 'visitadas'        
      })
      
    res.render('index', {
      title: 'Pa q no te aburras',
      ofertas: ofertas,
      visitadas: visitadas
    });
  }
}
