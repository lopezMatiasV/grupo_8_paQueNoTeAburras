module.exports = (sequelize, dataTypes) => {
    let alias = "Payments";
    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        medio_de_pago:{
            type: dataTypes.STRING(45),
            allowNull:false,
        },
        tarjeta_tipo:{
            type:dataTypes.STRING(45),
        },
        id_usuario:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        id_ordenCompra: {
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        
    }

    let config = {
        tableName  : "payments",
        timestamps: true,
        underscored: true
    }
    const Payment = sequelize.define(alias,cols,config)
 Payment.associate = function(models){
     Payment.belongsTo(models.User,{
        as:"payOut", /*pagado en ingles */
         foreignKey:"id_ordenCompra" 
     })
 }
    return Payment;
}