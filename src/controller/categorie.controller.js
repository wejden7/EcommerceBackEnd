const {
  createCategorie,
  findOneCategorie,
  deleteOneCategorie,
  updateOneCategorie,
  findAllCategorie,
} = require("../service/categorie.service");

const { validationResult } = require("express-validator");

const deleteFile = require("../utils/delete.utils");

exports.createCategorie = async (req, res, next) => {
  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    deleteFile("./storage/icons/" + req.file.filename);
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
  await findOneCategorie({ label: req.body.label }).then(async (result) => {
    console.log(result);
    if (result) {
      deleteFile("./storage/icons/" + req.file.filename);
      return res.status(400).send({
        success: false,
        message: req.body.label + "  Existe",
      });
    } else {
      const data = {
        label: req.body.label,
        icon: req.file.filename,
      };
      await createCategorie(data)
        .then((categorie) => {
          return res.status(200).send({
            success: true,
            message: "Categorie created",
            data: categorie,
          });
        })
        .catch((error) => {
          deleteFile("./storage/icons/" + req.file.filename);
          return res.status(400).send({
            success: false,
            message: "somthing failed to create categorie",
            errors: error.message,
          });
        });
    }
  });
};

exports.deleteOneCategorie = async (req, res, next) => {
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

  // TODO: Delete all sous Categorie  of this category

  deleteOneCategorie(condition)
    .then((result) => {
      if (!result) throw TypeError("Categorie not find");
      deleteFile("./storage/icons/" + result.icon);
      return res.status(200).send({
        success: true,
        message: "deleteOneCaregorie successfully",
        data: result,
      });
    })
    .catch((error) => {
      return res.status(400).send({
        success: false,
        message: "something failed to create categorie",
        errors: error.message,
      });
    });
};

exports.updateOneCategorie = async (req, res, next) => {
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
    };
  }

  if (!req.file) {
    var data = {
      label: req.body.label,
    };
  }
  updateOneCategorie(condition, data)
    .then((categorie) => {
      if (!categorie) throw TypeError("Categorie not find");

      return res.status(200).send({
        success: true,
        message: "Categorie updated successfully",

        data: categorie,
      });
    })
    .catch((error) => {
      if (req.file) deleteFile("./storage/icons/" + req.file.filename);
      return res.status(400).send({
        success: false,
        message: "something failed to update categorie",
        errors: error.message,
      });
    });
};

exports.findAllCategorie = async (req, res, next) => {
  findAllCategorie()
    .then((categories) => {
      res.status(200).json({
        success: true,
        message: "find all categories",
        data: categories,
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

exports.findOneCategorie = async (req, res, next) => {
  var condition = {
    _id: req.params.id,
  };

  findOneCategorie(condition)
    .then((categorie) => {
      if (!categorie) throw TypeError(" categorie not found");

      res.status(200).json({
        success: true,
        message: "find  categorie",
        data: categorie,
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

exports.listeCategories = async (req, res, next) => {
  findAllCategorie()
    .then(async (categories) => {
      let data = [];

      for await (item of categories) {
        let newitem = item.toObject();

        newitem.souscategorie = req.data.filter((_) =>
          _.categorie._id.equals(item._id)
        );

        data.push(newitem);
      }

      res.send(data);
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: "Somthing failed to find category",
        errors: error.message,
      });
    });
};
