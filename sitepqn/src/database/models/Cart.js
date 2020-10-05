module.exports = (sequelize,dataTypes) => {
    
    let alias = "Carts";
    let cols = {
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        id_usuario:{
            type:dataTypes.INTEGER.UNSIGNED,
            allowNull:false

        },
        id_usuario:{
            type:dataTypes.INTEGER.UNSIGNED,
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

    let config = {
        tableName: "cart",
        timestamps:true,
        underscored:true

    }

    const Cart = sequelize.define(alias,cols,config);
    Cart.associate = function(models){
       Cart.belongsTo(models.User,{
            as:"purchase", /*compra en ingles */
            foreignKey:"id_usuario"
        })
        Cart.hasMany(models.Product,{
            as:"buy", /*compra*/
            foreignKey:"id_producto"
        })

        
    }

    return Cart;
}