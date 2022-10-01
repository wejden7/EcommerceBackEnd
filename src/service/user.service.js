const userModel =require('../models/user.model')


async function createUser(data, callback) {

   new userModel(data)

    .save().then(user=>{

        console.log(user);

        return callback(null,user) ;

    }).catch(error=>{

        console.log(error);

        return callback(error);
    });
}

async function findOneUser(condition, callback) {
    
    userModel.findOne(condition)

  .then(user=>{ 
    if(user)
    return callback(null,user) ;
    return callback({error:"cloud not find the user"}); 
    }).catch(error=>{
        console.log(error);
          return callback({error:"cloud not find the user"}); 
          });
   
}

async function deleteOneUser(condition) {

   return await userModel.findByIdAndDelete(condition);
  
}

async function updateOneUser(condition,user){

 return await  userModel.findOneAndUpdate(condition,user,{new:true}).select("-_id -__v");

}

async function findAllUser( ) {
    
 return await userModel.find().select("-_id -__v");
 
}
module.exports={createUser,findOneUser,deleteOneUser,updateOneUser,findAllUser}