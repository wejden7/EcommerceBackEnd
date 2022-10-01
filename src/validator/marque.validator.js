const { body } = require('express-validator');

exports.createMarqueValidator =[
    body('label').exists().notEmpty(),
   
]
exports.upadteMarqueValidator=[
    body('label').exists().notEmpty(),
   
]