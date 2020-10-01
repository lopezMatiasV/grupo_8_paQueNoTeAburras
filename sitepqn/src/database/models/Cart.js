module.exports = (sequelize,dataTypes) => {
    
    let alias = "Carts";
    let cols = {
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        cantidad:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        ordenCompra:{
            type:dataTypes.INTEGER(11),
            allowNull:false,
            unique:true

        }
        
    }
//Falta terminar de configurar (id_usuario e id_producto)//
    let config = {
        tableName: "cart",
        timestamps:true,
        underscored:true

    }

    const User = sequelize.define(alias,cols,config);

    return Cart;
}