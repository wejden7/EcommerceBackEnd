const sousCategorieModel  = require('../models/sousCategorie.model');

async function creatSousCategorie(data){

    return await sousCategorieModel(data).save();

}

async function findSousCategorie(condition){

    return await sousCategorieModel.find(condition).populate("categorie",);
    
}
async function updateOneSousCategorie(condition, data){

    return await sousCategorieModel.findByIdAndUpdate(condition, data,{new:true});
    
}
async function deleteOneSousCategorie(condition){

    return await sousCategorieModel.findByIdAndDelete(condition);
    
}
// delete all sous-categorie of Categorie
async function deleteAllSousCategorieOfCategorie(condition){


    return await sousCategorieModel.deleteMany(condition);
    
}

module.exports  ={
    creatSousCategorie,
    findSousCategorie,
    deleteOneSousCategorie,
    updateOneSousCategorie,
    deleteAllSousCategorieOfCategorie
}