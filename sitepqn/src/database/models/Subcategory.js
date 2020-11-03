module.exports = (sequelize, dataTypes) => {
    let alias = "Subcategories";
    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        nombre: {
            type:dataTypes.STRING(45),
            allowNull:false
        },
        categoria:{
            type:dataTypes.INTEGER(11),
            
        }
        
    }

    let config = {
        tableName  : "subcategories",
        timestamps: false
    }
    const Subcategory = sequelize.define(alias,cols,config)
        Subcategory.associate = function(models){
           Subcategory.hasMany(models.Products,{
                as:"productos",
                foreignKey: "subcategoria"
            })
            Subcategory.belongsTo(models.Categories,{
                as:"categorias",
                foreignKey: "categoria"
            })
        }
        

    return Subcategory;
}