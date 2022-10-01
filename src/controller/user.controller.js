const {createUser,findOneUser,deleteOneUser,updateOneUser,findAllUser} = require ("../service/user.service");
const {validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');



exports.deleteUserById = async (req, res, next) => {


    const   {id} = req.params;

    const condition = {
        '_id': id
    }

    deleteOneUser(condition).then(
        (user) => {
            console.log(user);

            if(!user){

                return res.status(400).json({ errors: "user not found" });
            }
            res.status(200).send({
                success:true,
                message:'delete user successfully',
                user: user
                
            })
        }
        ).catch(error => {

            res.send({
                success:false,
                message:'Somthing went worng',
                error: error.message
            })
        });

}

exports.updateUserById= async(req , res, next)=>{

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            message:'requieste invalide ',
            errors: errors.array() 
        });    }

    const   {id, username, password,email} = req.body; 

    const condition = {
        '_id': id
    }

    if(!username && !password && !email  ) {

        return res.status(400).json({ 
            success: false,
            message:'parameter isEmpty',
            errors: errors.array()
            
        });

    }

    
    if(password ){
        var salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password,salt);
    }

    updateOneUser(condition, req.body)
    .then(result=>{

     return   res.status(200).send({
            success:true,
            message:'update user successfully',
            user:result
            
        })

    }).catch(error=>{
        es.status(200).send({
            success:false,
            message:'Somthing went worng',
            error: error.message

            
        })
    });

}

exports.findAllUser =async(req,res,next)=>{

    findAllUser().then(result=>{

        console.log(result);

        return res.status(200).send({
            success:true,
            message:'findAll user successfully',
            user:result
        });

    }).catch(error=>{
        console.log(error);
        return res.status(200).send({
            success:false,
            message:'error',
            error:error
        });

    });
}