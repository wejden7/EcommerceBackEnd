const descriptionRouter = require('express').Router()

// Controller
const {deleteDescription,addDescription,updateDescription}=require('../../controller/description.controller')

// Middelware


// Validator

const {deleteDescriptionValidator,addDescriptionValidator,upadteDescriptionValidator} = require('../../validator/description.validator');

descriptionRouter.delete('/description',deleteDescriptionValidator,deleteDescription)
descriptionRouter.post('/description',addDescriptionValidator,addDescription)
descriptionRouter.put('/description',upadteDescriptionValidator,updateDescription)

module.exports = descriptionRouter