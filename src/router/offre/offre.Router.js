const router = require('express').Router()

const {errorHandler, createController ,findController, deleteController,updateController,changeOrderController,updateImageController} = require('../../controller/offre.controller')

const {uploadImage} =require('../../utils/upload.utils')

router.post('/offre',uploadImage.single("image"),createController,errorHandler)
router.get('/offre',findController,errorHandler)
router.delete('/offre/:id',deleteController,errorHandler)
router.put('/offre/:id',updateController,changeOrderController,errorHandler)
router.put('/offre/image/:id',uploadImage.single("image"),updateImageController,errorHandler)

module.exports=router   