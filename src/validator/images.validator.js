const { body } = require('express-validator');

exports.deleteImageValidator =
    [
        body('id_produit').exists().notEmpty(),
        body('id_image').exists().notEmpty(),
       
    ];

exports.addImageValidator = [

    body('url').exists().notEmpty(),
    body('id').exists().notEmpty(),
]

