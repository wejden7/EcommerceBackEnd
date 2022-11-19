const { DeleteRepitition } = require("./categorie.util");
const { categorieByProduit } = require("./produit.util");
const { offreInTime } = require("./offre.util");

const ListCategorieByOffreProduit = async (offreProduit) => {
  let result = [];
  // select produit de offreProduit
  for await (let item of offreProduit) {
    const { produit } = JSON.parse(JSON.stringify(item));

    //select degradation of categorie de produit
    result.push(categorieByProduit(produit));
  }
  // retunr table of cadegorie select par offres produit que asocier par un offres
  return await DeleteRepitition(result);
};

const listOfOffresByOffreProduit = async (offreProduit) => {
  const offres = new Map();
  for await (const item of offreProduit) {
    item.offres.forEach((offre) => {
      if (offreInTime(offre) && !offre.sliderOffre)
        offres.set(offre._id, offre);
    });
  }

  return [...offres.values()];
};

const listOfProduitByOffreProduit = async (offreProduit) => {
  let result = [];
  for await (let item of offreProduit) {
    const { produit, offres, ...other } = JSON.parse(JSON.stringify(item));
    produit.categorie=categorieByProduit(produit)
    let newItem = { ...produit };
    newItem.offreProduit = { ...other };
    newItem.offres = offres.filter((item) => offreInTime(item));
    result.push(newItem);
  }
  return result;
};

module.exports = {
  ListCategorieByOffreProduit,
  listOfOffresByOffreProduit,
  listOfProduitByOffreProduit,
};
