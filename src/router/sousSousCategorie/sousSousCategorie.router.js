const SousCategorieRouter = require('express').Router()

// Controller  for the SousCategorie

const {
    creatSousSousCategorie1,
    findSousSousCategorie,
    deleteOneSousSousCategorie,
    updateOneSousSousCategorie1,
    deleteAllSousSousCategorieOfSousCategorie,
    
} = require ("../../controller/SousSousCategorie.controler");

// Validation  requieste
const {
    createSousSousCategorieValidator,
    updateSousSousCategorieByIdValidator,
    findSousSousCategorieByIdValidator
}=require('../../validator/sousSousCategorie.validator')

//uplode 
const {uploadIcon} =require('../../utils/upload.utils')
  
// Router 
   
SousCategorieRouter.post("/sousSousCategorie",uploadIcon.single('icon'),creatSousSousCategorie1);
SousCategorieRouter.get("/sousSousCategoriecategorie/:id",findSousSousCategorieByIdValidator,findSousSousCategorie);
SousCategorieRouter.get("/sousSousCategorie/:id",findSousSousCategorieByIdValidator,findSousSousCategorie);
SousCategorieRouter.get("/sousSousCategorie",findSousSousCategorie);
SousCategorieRouter.delete("/sousSousCategorie/:id",deleteOneSousSousCategorie);
SousCategorieRouter.put("/sousSousCategorie/:id",updateSousSousCategorieByIdValidator,uploadIcon.single('icon'),updateOneSousSousCategorie1);
SousCategorieRouter.delete("/sousSousCategoriecategorie/:id",deleteAllSousSousCategorieOfSousCategorie);



module.exports=SousCategorieRouter 