
const db = require('../database/models')

module.exports = {
    prueba: (req, res) => {
        db.Categories.findAll({
                include: [{
                    association: 'subcategorias'
                }]
            })
            .then(categorias => res.send(categorias))
            .catch(errors => res.send(errors))
    }

}