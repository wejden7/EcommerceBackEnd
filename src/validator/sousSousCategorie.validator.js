const { body } = require('express-validator');

exports.createSousSousCategorieValidator = 
    [
        body('label').exists().notEmpty(),
        body('souscategorie').exists().notEmpty(),
    ];
    
exports.deleteSousSousCategorieByIdValidator = body('id').exists().notEmpty();

exports.findSousSousCategorieByIdValidator = 
    [
        body('id').if(body('id').exists()).notEmpty().escape(),
        body('souscategorie').if(body('souscategorie').exists()).notEmpty().escape(),
    ];

exports.updateSousSousCategorieByIdValidator =
    [
        body('id').exists().notEmpty(),
        body('label').exists().notEmpty()
    ];