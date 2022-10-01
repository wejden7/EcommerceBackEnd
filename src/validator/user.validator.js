const { body ,param} = require('express-validator');

exports.validatorUpdateUserById = 
    [
        body('id').exists().notEmpty(),
        body('username').if(body('username').exists()).notEmpty().escape(),
        body('email').if(body('email').exists()).isEmail().escape(),
        body('password').if(body('password').exists()).isLength({ min:6}).escape(),
    ];

