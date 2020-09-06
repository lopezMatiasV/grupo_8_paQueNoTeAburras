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
      campaña: campaña,
      css:"style.css",
      
    });
  },
  search:(req, res)=>{
    let buscar = req.query.search;
        let productos = [];
        dbProduct.forEach(producto => {
            if (producto.name.toLowerCase().includes(buscar)) {
                productos.push(producto)
            }
        })
        res.render('products', {
            title: "Resultado de la búsqueda",
            productos: productos,
            css:"style.css",
        })
  },
    registro:(req, res)=>{
        res.render('registro',{
          title:"Pa Que | Registro",
          css:"registro.css"

        })
    },
    carrito:(req, res)=>{
        res.render('carrito',{
          title:"Pa Que | Carrito",
          css:"carrito.css"

        })
    }
  
}
