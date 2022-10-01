const categorieModel = require('../models/categorie.model');


async function createCategorie(data) {

  return await  categorieModel(data).save();
    
}
async function findOneCategorie(condition) {

  return  await   categorieModel.findOne(condition);
    
}
async function deleteOneCategorie(condition) {

  return  await categorieModel.findByIdAndDelete(condition)

    
}
async function updateOneCategorie(condition,data) {

 return await  categorieModel.findOneAndUpdate(condition,data,{new:true})
 .select("-_id -__v");

}
async function findAllCategorie( ) {
    
   return  await categorieModel.find()
     .select(" -__v");
    
    
}


module.exports={createCategorie,findOneCategorie,deleteOneCategorie,updateOneCategorie,findAllCategorie}