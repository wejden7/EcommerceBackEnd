forniseurRouter = require('express').Router()

// controller

const {deleteArrayForniseur,createForniseur,findForniseurById,findAllForniseur,deleteForniseur,upadteForniseur} = require('../../controller/forniseur.controller');

//Validator

const {createForniseurValidator,upadteForniseurValidator} = require('../../validator/forniseur.validator');

// Router

forniseurRouter.post("/forniseur",createForniseurValidator,createForniseur)
forniseurRouter.get('/forniseur/:id',findForniseurById);
forniseurRouter.get('/forniseur',findAllForniseur);
forniseurRouter.delete('/forniseur/:id',deleteForniseur);
forniseurRouter.post('/deleteforniseur',deleteArrayForniseur);
forniseurRouter.put('/forniseur/:id',upadteForniseurValidator,upadteForniseur);

module.exports = forniseurRouter