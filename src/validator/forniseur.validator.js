const { body } = require('express-validator');

exports.createForniseurValidator =[
    body('name').exists().notEmpty(),
    body('email').exists().isEmail(),
    body('tel').exists().isLength({min:8,max:8}),
    body('adresse').exists().notEmpty(),
]
exports.upadteForniseurValidator=[
    body('name').if(body('name').exists()).notEmpty(),
    body('email').if(body('email').exists()).isEmail(),
    body('tel').if(body('tel').exists()).isLength({min:8,max:8}),
    body('adresse').if(body('adresse').exists()).notEmpty(),
]