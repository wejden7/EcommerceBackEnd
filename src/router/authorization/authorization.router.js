const auth = require('express').Router()

const { body } = require('express-validator');

const {Admin}=require('../../controller/authorization.controller')


auth.get('/admin',Admin)





module.exports=auth