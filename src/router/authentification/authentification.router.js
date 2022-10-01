const auth = require('express').Router()
const { body } = require('express-validator');

const {registre,login}=require('../../controller/authentification.controller')

auth.post('/register', body('email').isEmail(),body('username').exists(),body('password').isLength({ min: 6 }),registre)
auth.post('/login',body('email').isEmail(),body('password').isLength({ min: 6 }),login)

module.exports=auth