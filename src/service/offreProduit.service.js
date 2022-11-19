const OffreProduit = require("../models/offreProduit");
const {
  ListCategorieByOffreProduit,
  listOfOffresByOffreProduit,
  listOfProduitByOffreProduit,
} = require("../utils/offreProduit.util");
async function create(data) {
  return new OffreProduit(data).save();
}

async function find(condition) {
  return OffreProduit.find(condition).populate(["produit", "offres"]);
}

async function findOffresByOffre(id) {
  // params id of offre
  // return : array offres of offre product asocier al id de offre in params
  let offreProduit = await OffreProduit.find({ offres: id })
    .populate(["produit", "offres"])
    .exec();
  return await listOfOffresByOffreProduit(offreProduit);
}

async function findProductByOffre(id) {
  // params is id of offre
  // return list of products asocier a cette offre
  let offreProduit = await OffreProduit.find({ offres: id })
    .populate([
      {
        path: "produit",
        populate: [
          {
            path: "categorie",
            populate: {
              path: "souscategorie",
              populate: { path: "categorie" },
            },
          },
          "images",
          "marque",
          "forniseur",
        ],
      },
      { path: "offres" },
    ])
    .exec();

  return await listOfProduitByOffreProduit(offreProduit);
}

async function findCategorieByOffre(id) {
  // select offre Produit asocier par l'offre
  let offreProduit = await OffreProduit.find({ offres: id })
    .populate({
      path: "produit",
      populate: [
        {
          path: "categorie",
          populate: {
            path: "souscategorie",
            populate: { path: "categorie" },
          },
        },
      ],
    })
    .exec();
  //select les categorie de offre Produit par func
  let result = await ListCategorieByOffreProduit(offreProduit);
  return result;
}

module.exports = {
  create,
  find,
  findOffresByOffre,
  findProductByOffre,
  findCategorieByOffre,
};
