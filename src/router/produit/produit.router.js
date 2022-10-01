const produitRouter = require('express').Router()

// Controller
const {createProduit,findProduit,deleteProduit,deleteAllProduit,updateProduit}=require('../../controller/produit.controller')

// Middelware
const{creatProduitError} =require('../../middleware/produit.middelware')
// Validator
const {createProduitValidator,updateProduitValidator}=require('../../validator/produit.validator')

//
const {uploadImage} =require('../../utils/upload.utils')
// Router 
produitRouter.post('/produit',createProduitValidator,uploadImage.array("images",25),createProduit,creatProduitError)
produitRouter.get('/produit',findProduit)
produitRouter.get('/produit/:id',findProduit)
produitRouter.delete('/produit/:id',deleteProduit)
produitRouter.delete('/produit',deleteAllProduit)

produitRouter.put('/produit/:id',updateProduitValidator,updateProduit)


module.exports=produitRouter