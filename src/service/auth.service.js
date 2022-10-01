const Jwt  = require('jsonwebtoken');

 function createToken (result) {

    const payload = {
        username:result.username,
        email:result.email,
        id:result._id
    }
    return token= Jwt.sign(payload,process.env.KEY,{expiresIn:"1d"})
  
}



module.exports={createToken}