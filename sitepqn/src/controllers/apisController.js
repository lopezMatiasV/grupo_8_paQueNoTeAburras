const fs = require('fs')
const path = require('path')

const {
  validationResult
} = require('express-validator');
const db = require('../database/models');
const {
  Op
} = require('sequelize')

module.exports = {
    categorias: function (req, res) {
      db.Categories.findAll({
        include: [
        {
          association : 'subcategorias' //es el alias de la asociasion? categorias
        }
      ]
      })
      .then(categorias => res.json(categorias))
      .catch(errors => console.log(errors))
    },

    subcategorias: function (req, res) {
        db.Subcategories.findAll({
          where: 
          {
            categoria: req.params.id  // recibe un id, depende de lo que selecciones en el select de categorías
          }
        
        })
        .then(subcategorias => res.json(subcategorias))
        .catch(errors => console.log(errors))
      }
}