const dbProducts = require('../data/dataBase')
const dbCategories = require('../data/categories.json')
const fs = require ('fs')
const path = require('path')

module.exports = {
    listar: function(req, res) {
        res.render('listar', {
            title: "Pa Que | Todos los productos",
            producto: dbProducts,
            css:"style.css",
            usuario:req.session.usuario

        })
    },
    detalle: function(req, res){
        let idProduct = req.params.id; //ruta parametrizada en lenguaje express
         let producto = dbProducts.filter(producto=>{
            return producto.id == idProduct 
            })

        res.render('productos',{
            title:"Pa Que | Detalle del producto",
            producto:producto[0],//le colocamos así para que envíe a la vista un sólo elemento//
            css: "styleDetalleProducto.css",
            usuario:req.session.usuario

        })
    },
    agregar:function(req,res){
        let categoria;
        let subCategoria;
        if (req.query.categoria){
            categoria = req.query.categoria;
            subCategoria = req.query.subCategoria;
        }
        res.render('carga',{
            title:"Agregar Producto",
            categorias:dbProducts,
            categoria:categoria,
            subCategoria:subCategoria,
            css:"style.css",
            usuario:req.session.usuario

        })
    },
    publicar:function(req,res,next){
        let lastID = 1;
        dbProducts.forEach(producto=>{
            if(producto.id > lastID){
                lastID = producto.id
            }
        })
        let newProduct = {
            id:lastID + 1,
            sku:req.body.sku,
            nombre:req.body.nombre,
            precio:Number(req.body.precio),
            categoria:req.body.categoria,
            subCategoria:req.body.subCategoria,
            descripcion:req.body.descripcion,
            seccion:req.body.seccion,
            discount:Number(req.body.discount),
            img:(req.files[0])?req.files[0].filename:"default-image.png"
        }
        dbProducts.push(newProduct);
        
        fs.writeFileSync(path.join(__dirname,"..","data","dbProducts.json"),JSON.stringify(dbProducts),'utf-8')

        res.redirect('/products')
    },
    show:function(req,res){
        let idProducto = req.params.id;
        let flap = req.params.flap;

        let activeDetail;
        let activeEdit;
        let showDetail;
        let showEdit;

        if(flap == "show"){
            activeDetail = "active";
            showDetail = "show"
        }else{
            activeEdit = "active";
            showEdit = "show";
        } 

        let resultado = dbProducts.filter(producto=>{
            return producto.id == idProducto
        })

        res.render('productShow',{
            title: "Editar Producto",
            producto:resultado[0],
            total:dbProducts.length,
            categoria:dbProducts,
            activeDetail: activeDetail,
            activeEdit: activeEdit,
            showDetail:showDetail,
            showEdit:showEdit,
            css:"style.css",
            usuario:req.session.usuario

        })
    },
    edit:function(req,res){
        let idProducto = req.params.id;

        dbProducts.forEach(producto => {
            if (producto.id == idProducto) {
                producto.id = Number(req.body.id);
                producto.nombre = req.body.nombre;
                producto.sku = req.body.sku;
                producto.descripcion = req.body.descripcion;
                producto.precio = Number(req.body.precio);
                producto.categoria = req.body.categoria;
                producto.subCategoria = req.body.subCategoria;
                producto.seccion = req.body.seccion;
                producto.img = (req.files[0]) ? req.files[0].filename : producto.img
                producto.discount = Number(req.body.discount);            
            }
        })

        fs.writeFileSync(path.join(__dirname, '../data/dbProducts.json'), JSON.stringify(dbProducts))
        res.redirect('/products/show/' + idProducto)
    },
    eliminar:function(req,res){
        let idProducto = req.params.id
        idProducto = parseInt(idProducto)
        let filtro = dbProducts.filter(producto => {
            return producto.id != idProducto; 
        })
        fs.writeFileSync(path.join(__dirname, '../data/dbProducts.json'), JSON.stringify(filtro), 'utf-8');
        res.redirect('/products')
    }
}
