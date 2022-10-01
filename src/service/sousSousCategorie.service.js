const sousSousCategorieModel = require('../models/sousSousCategorie.model');

async function creatSousSousCategorie(data){

    return await sousSousCategorieModel(data).save();

}

async function findSousSousCategorie(condition){

    return await sousSousCategorieModel.find(condition).populate("souscategorie",);
    
}
async function updateOneSousSousCategorie(condition, data){

    return await sousSousCategorieModel.findByIdAndUpdate(condition, data,{new:true});
    
}
async function deleteOneSousSousCategorie(condition){

    return await sousSousCategorieModel.findByIdAndDelete(condition);
    
}
// delete all sous-categorie of Categorie
async function deleteAllSousSousCategorieOfSousCategorie(condition){


    return await sousSousCategorieModel.deleteMany(condition);
    
}

module.exports  ={
    creatSousSousCategorie,
    findSousSousCategorie,
    deleteOneSousSousCategorie,
    updateOneSousSousCategorie,
    deleteAllSousSousCategorieOfSousCategorie
}