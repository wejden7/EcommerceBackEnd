const UserRouter = require('express').Router()

// Controller
const {deleteUserById,updateUserById,findAllUser}=require('../../controller/user.controller')

// Validator
const {validatorUpdateUserById}=require('../../validator/user.validator')

// Router 
UserRouter.delete('/user/:id' ,deleteUserById)
UserRouter.put('/user',validatorUpdateUserById ,updateUserById)
UserRouter.get('/user' ,findAllUser)


module.exports=UserRouter