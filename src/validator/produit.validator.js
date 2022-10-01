const { body ,param} = require('express-validator');

exports.createProduitValidator =
    [
        body('name').exists().notEmpty(),
        body('prix').exists().notEmpty(),
        body('quantity').exists().notEmpty(),
        body('tva').exists().notEmpty(),
    ];

exports.updateProduitValidator =
    [
        body('name').if(body('name').exists()).notEmpty(),
        body('prix').if(body('prix').exists()).notEmpty().escape(),
        body('quantity').if(body('quantity').exists()).notEmpty().escape(),
        body('tva').if(body('tva').exists()).notEmpty().escape(),
    ];

