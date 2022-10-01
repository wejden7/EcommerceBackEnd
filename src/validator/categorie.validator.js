const { body,param } = require('express-validator');

exports.createCategorieValidator = [
    body('label').exists().notEmpty(),
];

exports.deleteCategorieByIdValidator = param('id').exists().notEmpty();

exports.updateCategorieByIdValidator =[
    body('label').exists().notEmpty()
];
