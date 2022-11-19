const router = require('express').Router()

const {errorHandler, createController,findController,deleteController,updateController } = require('../../controller/offreProduit.controller')

const {uploadImage} =require('../../utils/upload.utils')

router.post('/offre/produit',uploadImage.single("image"),createController,errorHandler)
router.put('/offre/produit/:id',uploadImage.single("image"),updateController,errorHandler)
router.get('/offre/produit',findController,errorHandler)
router.delete('/offre/produit/:id',deleteController,errorHandler)
 

module.exports=router   