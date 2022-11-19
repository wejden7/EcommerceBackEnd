const deleteFile = require("../utils/delete.utils");
const { create, find } = require("../service/offreProduit.service");
const OffreProduit = require("../models/offreProduit");

exports.errorHandler = async (error, req, res, next) => {
  let message = "something went wrong";

  if (req.file) deleteFile("./storage/images/" + req.file.filename);
  if (
    error.keyValue?.order != null &&
    error.name === "MongoServerError" &&
    error.code === 11000
  )
    message = "Order must be unique " + error.keyValue.order + " exists";

  return res.status(501).json({
    success: false,
    message: message,
    error: error?.message || error,
  });
};

exports.createController = async (req, res, next) => {
  if (!req.body.offres) req.body.offres = [];

  req.body.countRest = req.body.count;
  await create(req.body)
    .then(async (offre) => {
      return await find({ _id: offre._id });
    })
    .then((offre) => {
      return res.status(200).json({
        success: true,
        message: "Data criado com sucesso",
        data: offre[0],
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateController = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Test de l'existance de l'order
    const offreByOrder = await OffreProduit.findOne({
      order: req.body.order,
    }).exec();

    if (offreByOrder && !offreByOrder._id.equals(id))
      return next("Order must be unique ");

    // si uplode une image delete l'image existe
    if (req.file) {
      const offreById = await OffreProduit.findById(id).exec();
      if (offreByOrder) deleteFile("./storage/images/" + offreById?.image);
    }

    /* 
        Test Des offres
        si undefined 
        set empty array : pour delete les autre offres
     */
    if (!req.body.offres) req.body.offres = [];

    // update
    const offreUpdate = await OffreProduit.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate(["produit", "offres"])
      .exec();

    return res.status(200).json({
      success: true,
      message: "Data criado com sucesso",
      data: offreUpdate,
    });
  } catch (error) {
    next(error);
  }
};

exports.findController = async (req, res, next) => {
  await find({})
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "Data criado com sucesso",
        data: result,
      });
    })
    .catch((error) => next(error));
};

exports.deleteController = async (req, res, next) => {
  const { id } = req.params;

  OffreProduit.findByIdAndDelete(id, (err, result) => {
    if (err) return next(err);
    deleteFile("./storage/images/" + result?.image);
    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
      data: result,
    });
  });
};
