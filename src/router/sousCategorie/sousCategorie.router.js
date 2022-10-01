const SousCategorieRouter = require('express').Router()

// Controller  for the SousCategorie

const {
    creatSousCategorie,
    findSousCategorie,
    deleteOneSousCategorie,
    updateOneSousCategorie,
    deleteAllSousCategorieOfCategorie,
    deleteAllSousSousCategorieOfSousCategorie
} = require ("../../controller/sousCategorie.controller");

// Validation  requieste
const {
    createSousCategorieValidator,
    deleteSousCategorieByIdValidator,
    updateSousCategorieByIdValidator,
    findSousCategorieByIdValidator
}=require('../../validator/sousCategorie.validator')
//Uplode icon
const {uploadIcon} =require('../../utils/upload.utils')

// Router

SousCategorieRouter.post("/sousCategorie",createSousCategorieValidator,uploadIcon.single('icon'),creatSousCategorie);
SousCategorieRouter.get("/sousCategoriecategorie/:id",findSousCategorieByIdValidator,findSousCategorie);
SousCategorieRouter.get("/sousCategorie/:id",findSousCategorieByIdValidator,findSousCategorie);
SousCategorieRouter.get("/sousCategorie",findSousCategorie);
SousCategorieRouter.delete("/sousCategorie/:id",deleteAllSousSousCategorieOfSousCategorie,deleteOneSousCategorie);
SousCategorieRouter.put("/sousCategorie/:id",updateSousCategorieByIdValidator,uploadIcon.single('icon'),updateOneSousCategorie);
SousCategorieRouter.delete("/sousCategorie",deleteSousCategorieByIdValidator,deleteAllSousCategorieOfCategorie);



module.exports=SousCategorieRouter