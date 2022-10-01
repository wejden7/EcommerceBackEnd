const CategorieRouter = require('express').Router()

// Controller
const {createCategorie,deleteOneCategorie,updateOneCategorie,findAllCategorie,findOneCategorie,}=require('../../controller/categorie.controller')

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


module.exports=CategorieRouter