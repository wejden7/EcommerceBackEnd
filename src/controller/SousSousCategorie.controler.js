const {
  creatSousSousCategorie,
  findSousSousCategorie,
  deleteOneSousSousCategorie,
  updateOneSousSousCategorie,
  deleteAllSousSousCategorieOfSousCategorie,
} = require("../service/sousSousCategorie.service");

const { findSousCategorie } = require("../service/sousCategorie.service");

const { validationResult } = require("express-validator");
const deleteFile = require("../utils/delete.utils");
exports.creatSousSousCategorie1 = async (req, res, next) => {
  console.log(2);
  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    if (req.file) deleteFile("./storage/icons/" + req.file.filename);
    return res.status(400).json({
      success: false,
      message: "requieste invalide ",
      errors: errors.array(),
    });
  }
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Error of icon ",
    });
  }
  const { souscategorie } = req.body;
  var condition = {
    _id: souscategorie,
  };

  req.body.icon = req.file.filename;
  findSousCategorie(condition)
    .then(async (result) => {
      if (result.length === 0) throw TypeError("Sous Categorie not find");

      return await creatSousSousCategorie(req.body);
    })
    .then((categorie) => {
      return res.status(200).send({
        success: true,
        message: "Categorie created",
        categorie: categorie,
      });
    })
    .catch((error) => {
      if (req.file) deleteFile("./storage/icons/" + req.file.filename);
      return res.status(400).send({
        success: false,
        message: "somthing failed to create categorie",
        error: error.message,
      });
    });
};

exports.findSousSousCategorie = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "requested invalided ",
      errors: errors.array(),
    });
  }

  const { id, categorie } = req.body;

  if (id) {
    var condition = {
      _id: req.body.id,
    };
  } else if (categorie) {
    var condition = {
      categorie: req.body.categorie,
    };
  } else {
    var condition = {};
  }

  findSousSousCategorie(condition)
    .then((categorie) => {
      if (categorie.length === 0) throw TypeError("Sous categorie not found");

      res.status(200).json({
        success: true,
        message: "find  categorie",
        count: categorie.length,
        categories: categorie,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Somthing failed to find category",
        errors: error.message,
      });
    });
};

exports.deleteOneSousSousCategorie = async (req, res, next) => {
  var condition = {
    _id: req.params.id,
  };

  // TODO: Delete all sous-sous-categorie  of this category

  deleteOneSousSousCategorie(condition)
    .then((result) => {
      if (!result) throw TypeError("Categorie not find");

      deleteFile("./storage/icons/" + result.icon);
      return res.status(200).send({
        success: true,
        message: "deleteOneCaregorie successfully",
        categorie: result,
      });
    })
    .catch((error) => {
      return res.status(400).send({
        success: false,
        message: "something failed to create categorie",
        error: error.message,
      });
    });
};

exports.updateOneSousSousCategorie1 = async (req, res, next) => {
  const errors = validationResult(req.body);
  console.log(true);
  if (!errors.isEmpty()) {
    if (req.file) deleteFile("./storage/icons/" + req.file.filename);
    return res.status(400).json({
      success: false,
      message: "requested invalided ",
      errors: errors.array(),
    });
  }

  var condition = {
    _id: req.params.id,
  };

  if (req.file) {
    deleteFile("./storage/icons/" + req.body.iconUpadte);
    var data = {
      label: req.body.label,
      icon: req.file.filename,
      souscategorie: req.body.souscategorie,
    };
  }
  if (!req.file) {
    var data = {
      label: req.body.label,
      souscategorie: req.body.souscategorie,
    };
  }

  updateOneSousSousCategorie(condition, data)
    .then((categorie) => {
      if (!categorie) throw TypeError("Categorie not find");

      return res.status(200).send({
        success: true,
        message: "Categorie updated successfully",
        categorie: categorie,
      });
    })
    .catch((error) => {
      return res.status(400).send({
        success: false,
        message: "something failed to update categorie",
        error: error.message,
      });
    });
};
exports.deleteAllSousSousCategorieOfSousCategorie = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "requested invalided ",
      errors: errors.array(),
    });
  }

  var condition = {
    souscategorie: req.body.id,
  };

  // TODO: Delete all sous Categorie  of this category

  deleteAllSousSousCategorieOfSousCategorie(condition)
    .then((result) => {
      if (result.deletedCount === 0) throw TypeError("Categorie not find");

      return res.status(200).send({
        success: true,
        message: "deleteOneCaregorie successfully",
        categorie: result,
      });
    })
    .catch((error) => {
      return res.status(400).send({
        success: false,
        message: "something failed to create categorie",
        error: error.message,
      });
    });
};

exports.listSSCategorie= async (req, res, next) => {
  
  findSousSousCategorie({})
    .then((categorie) => {
     req.data = categorie
     next()
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Somthing failed to find category",
        errors: error.message,
      });
    });
}