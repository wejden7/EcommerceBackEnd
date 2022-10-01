marqueRouter = require('express').Router()

// controller

const {createMarque,findMarqueById,findMarque,deleteMarqueById,deleteMarque,updateMarque} = require('../../controller/marque.controller');

//Validator

const {createMarqueValidator,upadteMarqueValidator} = require('../../validator/marque.validator');


// uplode logo 

const {uploadLogo} = require('../../utils/upload.utils');

// Router

marqueRouter.post("/marque",createMarqueValidator,uploadLogo.single("logo"),createMarque)

marqueRouter.get('/marque/:id',findMarqueById);
marqueRouter.get('/marque',findMarque);

marqueRouter.delete('/marque/:id',deleteMarqueById);
marqueRouter.delete('/marque',deleteMarque);
marqueRouter.put('/marque/:id',upadteMarqueValidator,uploadLogo.single("logo"),updateMarque);

module.exports = marqueRouter