const {createUser,findOneUser} = require ("../service/user.service");
const {createToken} =require("../service/auth.service");
var bcrypt = require('bcryptjs');
const {validationResult } = require('express-validator');


//register un user ent utilisant le service createUser si valide creatToken puit return la resulat final

exports.registre = async (req ,res,next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) { 

        return res.status(400).json({ 
            success: false,
            message:'requieste invalide ',
            errors: errors.array() 
        });
    }   
    var salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password,salt);

    createUser(req.body,(error,result)=>{

        if(error){
          return  res.send({
                success:false,
                message:'Somthing went worng',
                error: error.message
            })
        }
       token =  createToken(result);

       return res.send({
            success:true,
            message:'User create successfully',
            token:"Bearer "+token
        })

    });

}
//login user with email and password  
//on utilisant service findOneUser avec condition of email
//tchek password is valide 
exports.login =async (req,res,next)=> {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({ 
        success: false,
        message:'requieste invalide ',
        errors: errors.array() 
    });

    }
    const {email, password } = req.body

    const condition = {
        email:email,
    }

    findOneUser(condition,(error,result)=>{
        if(error){
            return res.status(401).send({
                success:false,
                message:error
            });
        }
        if(!bcrypt.compareSync(password,result.password)){
            return res.status(401).send({
                success:false,
                message:"Incorect password"
            })
        }

       token = createToken(result);

        return res.status(200).send({
            success:true,
            message:"Login in successfuly",
            token:"Bearer "+token
        })
});
}

 