module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            allowNull:false,
            unique:true,
            autoIncrement:true,
            primaryKey:true
        },
        sku: {
            type: dataTypes.STRING(45),
            allowNull:false,
            unique:true,
        },
        nombre:{
            type:dataTypes.STRING(100),
            allowNull:false
        },
        descripcion:{
            type:dataTypes.STRING(450),
            allowNull:false
        },
        precio: {
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        id_categoria:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        categoria:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        subcategoria:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        fotos:{
            type:dataTypes.STRING(300),
            allowNull:false,
            unique:true,
        },
        section:{
            type:dataTypes.STRING(45)
        },
        descuento: {
            type:dataTypes.INTEGER(11),
        },      
    }

    let config = {
        tableName  : "products",
        timestamps: true,
        underscored: true
    }
    const Product = sequelize.define(alias,cols,config)
    Product.associate =function(models){
    Product.belongsTo(models.Carts,{
        as:"cart",
        foreignKey:"id_producto"
    })
    Product.belongsTo(models.Categories,{
        as:"categori",
        foreignKey: "id_categoria"
    })

    }
    return Product;
}