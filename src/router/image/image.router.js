
const imageRouter = require('express').Router()

// Controller
const {deleteImage,addImage}=require('../../controller/image.controller')

// Middelware


// Validator

const {deleteImageValidator,addImageValidator} = require('../../validator/images.validator');

imageRouter.delete('/image',deleteImageValidator,deleteImage)
imageRouter.post('/image',addImageValidator,addImage)

module.exports = imageRouter