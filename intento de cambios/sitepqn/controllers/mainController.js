let dbProducts = require('../data/dataBase');

module.exports = {
    index: (req, res, next)=> {
      let ofertas = dbProducts.filter(producto=>{
        return producto.seccion == 'ofertas'
      })
      let visitadas = dbProducts.filter(producto=>{
        return producto.seccion == 'visitadas'        
      })
      let campaña = dbProducts.filter(producto=>{
        return producto.seccion == 'campaña'        
      })

      
    res.render('index', {
      title: 'Pa q no te aburras',
      ofertas: ofertas,
      visitadas: visitadas,
      campaña: campaña
    });
  },
    registro:(req, res)=>{
        res.render('registro',{
          title:"Pa Que | Registro"
        })
    },
    carrito:(req, res)=>{
        res.render('carrito',{
          title:"Pa Que | Carrito"
        })
    }
  
}
