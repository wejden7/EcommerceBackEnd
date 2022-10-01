const {
  deleteAllSousCategorieOfCategorie,
  findSousCategorie,
} = require("../service/sousCategorie.service");

const {
  deleteAllSousSousCategorieOfSousCategorie,
  findSousSousCategorie
} = require("../service/sousSousCategorie.service");

const { validationResult } = require("express-validator");
const deleteFile = require('../utils/delete.utils')

// Delete sous-categorie by id_categorie

exports. deleteSousCategorie = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "requested invalided ",
      errors: errors.array(),
    });
  }

  var condition = {
    categorie: req.params.id,
  };

  findSousCategorie(condition)
  .then((categorie) => {
    for (var i = 0; i < categorie.length; i++) {
      deleteFile('./storage/icons/'+categorie[i].icon)
    }
  })


  deleteAllSousCategorieOfCategorie(condition)
    .then((result) => {
      req.count = result.deletedCount;

      next();
    })
    .catch((error) => {
      return res.status(400).send({
        success: false,
        message: "something failed to create categorie",
        errors: error.message,
      });
    });
};

// Delete sous-sous-categorie by id_categorie

exports.deleteSousSousCategorie = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "requested invalided ",
      errors: errors.array(),
    });
  }

  var condition = {
    categorie: req.params.id,
  };
  findSousCategorie(condition)
    .then((categorie) => {
      for (var i = 0; i < categorie.length; i++) {
        console.log(categorie[i]._id);

        var condition = {
          souscategorie: categorie[i]._id,
        };
        findSousSousCategorie(condition).then((result)=>{
          for (var i = 0; i < result.length; i++) {
              deleteFile('./storage/icons/'+result[i].icon)
            }
      })
        deleteAllSousSousCategorieOfSousCategorie(condition);
      }

      next();
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Somthing failed to find category",
        errors: error.message,
      });
    });
};
