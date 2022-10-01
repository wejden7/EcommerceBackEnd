
const forniseurModel =require("../models/forniseur.model")


async function createForniseur(data) {
     return new forniseurModel(data).save();
}

async function findForniseur(condition){

    return await forniseurModel.find(condition);
}

async function delteForniseur(condition){
 
    return await forniseurModel.deleteMany(condition);
}

async function updateForniseur(condition,data){

    return await forniseurModel.findByIdAndUpdate(condition,data,{new:true });
}

module.exports ={createForniseur,findForniseur,delteForniseur,updateForniseur}