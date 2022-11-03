const CategorieRouter = require('express').Router()

const {listSCategorie} = require('../../controller/sousCategorie.controller')
const {listSSCategorie} = require('../../controller/SousSousCategorie.controler')
// Controller
const {createCategorie,deleteOneCategorie,updateOneCategorie,findAllCategorie,findOneCategorie,listeCategories}=require('../../controller/categorie.controller')

// Middleware 

const {deleteSousCategorie,deleteSousSousCategorie}= require("../../middleware/categorie.middleware")

// Validator
const {createCategorieValidator,deleteCategorieByIdValidator,updateCategorieByIdValidator}=require('../../validator/categorie.validator')

// uplode image
const {uploadIcon} =require('../../utils/upload.utils')
// Router
CategorieRouter.post('/categorie',createCategorieValidator,uploadIcon.single('icon'),createCategorie)
CategorieRouter.delete('/categorie/:id',deleteCategorieByIdValidator,deleteSousSousCategorie,deleteSousCategorie,deleteOneCategorie)
CategorieRouter.put('/categorie/:id',updateCategorieByIdValidator,uploadIcon.single('icon'),updateOneCategorie)
CategorieRouter.get('/categorie/:id',findOneCategorie)
CategorieRouter.get('/categorie',findAllCategorie)
CategorieRouter.get('/listcategorie',listSSCategorie,listSCategorie,listeCategories)


module.exports=CategorieRouter