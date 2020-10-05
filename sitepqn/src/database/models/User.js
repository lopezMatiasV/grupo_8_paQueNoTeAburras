module.exports = (sequelize,dataTypes) => {
    
    let alias = "Users";
    let cols = {
        id:{
            type:dataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        nombre:{
            type: dataTypes.STRING(45),
            allowNull:false
        },
        apellido:{
            type: dataTypes.STRING(45),
            allowNull:false
        },
        email:{
            type: dataTypes.STRING(45),
            allowNull:false,
            unique:true
        },
        pass:{
            type: dataTypes.STRING(100),
            allowNull:false
        },
        dni:{
            type: dataTypes.CHART(8),
            unique:true
        },
        avatar:{
            type: dataTypes.STRING(100)
        },
        direccion:{
            type: dataTypes.STRING(255),
            unique:true
        },
        ciudad:{
            type: dataTypes.STRING(255),
            allowNull:false
        },
        provincia:{
            type: dataTypes.STRING(100),
            allowNull:false
        },
        rol:{
            type: dataTypes.STRING(45),
            allowNull:false
        },
    }

    let config = {
        tableName: "users",
        timestamps:true,
        underscored:true

    }

    const User = sequelize.define(alias,cols,config);

User.associate = function(models){
User.hasMany(models.Cart,{
    as:"carts", /*nombre de fantasia de la relación de las tablas*/
    foreignKey:"id_usuario"
}),
User.hasMany(models.Payment,{
    as:"payments",
    foreignKey:"id_ordenCompra" 

})

}
    return User;
}