const Offre = require("../models/offre.model");
const { inTime } = require("../utils/offre.util");
const {
  findOffresByOffre,
  findProductByOffre,
  findCategorieByOffre,
} = require("../service/offreProduit.service");
exports.SliderOffre = async (req, res, next) => {
  try {
    let offre = await Offre.find({ sliderOffre: true }).select("-__v ").exec();

    // check if tous les offre in time zone debut ,fin
    offre = inTime(offre);
    offre.sort((a, b) => a.order - b.order);
    return res.status(200).json({
      status: true,
      message: "success",
      data: offre,
    });
  } catch (error) {}
};

exports.SliderOffreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let resualt = {};
    let offre = await Offre.findById(id).select("-__v ").exec();
    resualt.offre = offre;
    resualt.offres = await findOffresByOffre(offre._id);
    resualt.produit = await findProductByOffre(offre._id);
    resualt.categorie = await findCategorieByOffre(offre._id);

    return res.status(200).json({
      status: true,
      message: "success",
      data: resualt,
    });
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "non",
      data: error.message,
    });
  }
};
