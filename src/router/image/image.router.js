
const imageRouter = require('express').Router()

// Controller
const {deleteImage,addImage}=require('../../controller/image.controller')

// Middelware


// Validator

const {deleteImageValidator,addImageValidator} = require('../../validator/images.validator');
const {uploadImage} =require('../../utils/upload.utils')//uploadImage.array("images",25)

imageRouter.delete('/image',deleteImageValidator,deleteImage)
imageRouter.post('/image',addImageValidator,uploadImage.array("images",25),addImage)

module.exports = imageRouter