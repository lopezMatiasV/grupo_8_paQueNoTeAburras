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
        }
        
    }

    let config = {
        tableName  : "subcategories",
        timestamps: false
    }
    const Subcategory = sequelize.define(alias,cols,config)
        Subcategory.associate = function(models){
           Subcategory.belongsTo(models.Categories,{
                as:"seccion",
                foreignKey: "id_subcategoria"
            })
        }
        

    return Subcategory;
}