const { body } = require('express-validator');

exports.deleteDescriptionValidator =
    [
        body('id_produit').exists().notEmpty(),
        body('id_description').exists().notEmpty(),
       
    ];

exports.addDescriptionValidator = [

    body('title').exists().notEmpty(),
    body('description').exists().notEmpty(),
    body('id').exists().notEmpty(),
]

exports.upadteDescriptionValidator = [

    body('title').if(body('title').exists()).notEmpty().escape(),
    body('description').if(body('description').exists()).notEmpty().escape(),
    body('id').if(body('id').exists()).notEmpty().escape(),
]