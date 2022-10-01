const { body ,check} = require('express-validator');

exports.createSousCategorieValidator =
    [
        check('label').exists().notEmpty(),
        check('categorie').exists().notEmpty(),
    ];

exports.deleteSousCategorieByIdValidator = body('id').exists().notEmpty();

exports.findSousCategorieByIdValidator = 
    [
        body('id').if(body('id').exists()).notEmpty().escape(),
        body('categorie').if(body('categorie').exists()).notEmpty().escape(),
    ];
exports.updateSousCategorieByIdValidator =
    [
        body('label').exists().notEmpty(),
        check('categorie').exists().notEmpty(),
    ]; 