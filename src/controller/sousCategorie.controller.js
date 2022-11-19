const {
  creatSousCategorie,
  findSousCategorie,
  deleteOneSousCategorie,
  updateOneSousCategorie,
  deleteAllSousCategorieOfCategorie,
} = require("../service/sousCategorie.service");

const {
  deleteAllSousSousCategorieOfSousCategorie,
  findSousSousCategorie,
} = require("../service/sousSousCategorie.service");

const { findOneCategorie } = require("../service/categorie.service");

const { validationResult } = require("express-validator");
const deleteFile = require("../utils/delete.utils");

exports.creatSousCategorie = async (req, res, next) => {
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
  const { categorie } = req.body;
  var condition = {
    _id: categorie,
  };
  req.body.icon = req.file.filename;
  findOneCategorie(condition)
    .then(async (result) => {
      if (!result) throw TypeError("Categorie not find");

      return await creatSousCategorie(req.body);
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

exports.findSousCategorie = async (req, res, next) => {
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

  findSousCategorie(condition)
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

exports.deleteOneSousCategorie = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "requested invalided ",
      errors: errors.array(),
    });
  }

  var condition = {
    _id: req.params.id,
  };

  // TODO: Delete all sous-sous-categorie  of this category

  deleteOneSousCategorie(condition)
    .then((result) => {
      if (!result) throw TypeError("Categorie not find");
      deleteFile("./storage/icons/" + result.icon);
      return res.status(200).send({
        success: true,
        message: "deleteOneCaregorie successfully",
        count: req.count,
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
exports.updateOneSousCategorie = async (req, res, next) => {
  const errors = validationResult(req.body);

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
      categorie: req.body.categorie,
    };
  }
  if (!req.file) {
    var data = {
      label: req.body.label,
      categorie: req.body.categorie,
    };
  }

  console.log(req.body);

  updateOneSousCategorie(condition, data)
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
exports.deleteAllSousCategorieOfCategorie = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "requested invalided ",
      errors: errors.array(),
    });
  }

  var condition = {
    categorie: req.body.id,
  };

  // TODO: Delete all sous Categorie  of this category

  deleteAllSousCategorieOfCategorie(condition)
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
// Midelwere
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
    souscategorie: req.params.id,
  };
  findSousSousCategorie(condition).then((result) => {
    for (var i = 0; i < result.length; i++) {
      deleteFile("./storage/icons/" + result[i].icon);
    }
  });
  deleteAllSousSousCategorieOfSousCategorie(condition)
    .then((categorie) => {
      req.count = categorie.deletedCount;

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

exports.listSCategorie = async (req, res, next) => {
  findSousCategorie({})
    .then(async (categorie) => {
      let data = [];

      for await (item of categorie) {
        let newitem = item.toObject();

        newitem.soussouscategorie = req.data.filter((_) =>
          _.souscategorie._id.equals(item._id)
        );

        data.push(newitem);
      }

      req.data = data;
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
