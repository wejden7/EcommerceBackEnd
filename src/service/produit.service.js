
const produitModel = require('../models/produit.models');
const imageModel = require('../models/image.model');
const descriptionModel = require('../models/description.model');
const marqueModel = require('../models/marque.model');
const forniseurModel = require('../models/forniseur.model');
const  sousSousCategorieModel = require('../models/sousSousCategorie.model');


async function createProduit(produit) {

    return await produitModel(produit).save();
}

async function findProduit(condition){
    
    return await produitModel.find(condition).populate(["images","description","marque","forniseur","categorie"]);
}

async function deleteProduit(condition){

    return await produitModel.deleteMany(condition);
}

async function deleteAllProduit(callback){

    await produitModel.deleteMany().
        then(async(result)=>{
            await imageModel.deleteMany();
            await descriptionModel.deleteMany();
            callback(null, result);
        }).catch((error=>{
            callback(error.message);
        }));

}

async function updateProduit(condition, produit){

    return await produitModel.findOneAndUpdate(condition, produit,{new:true});
}

async function deleteImageProduit(condition,image){

    return await produitModel
        .updateOne(condition,{$pull:{"images":image}},{ safe: true, multi:true })
}

async function  addImage(condition,image){

    return await produitModel
        .updateOne(condition,{$push:{"images":image}},{ new:true,safe: true, multi:true })
}

async function  addDescription(condition,description){

    return await produitModel
        .updateOne(condition,{$push:{"description":description}},{new:true ,safe: true, multi:true })
}

async function  deleteDescriptionProduit(condition ,description){

    return await produitModel
    .updateOne(condition,{$pull:{"description":description}},{ safe: true, multi:true });

}
async function  deleteMarequeProduit(condition){

    return await produitModel
    .updateOne(condition,{'marque':null},{ safe: true, multi:true });

}
async function  deleteForniseurProduit(condition){

    return await produitModel
    .updateOne(condition,{'forniseur':null},{ safe: true, multi:true });

}
async function  deleteCategorieProduit(condition){

    return await produitModel
    .updateOne(condition,{'categorie':null},{ safe: true, multi:true });

}
async function TestOfid(m,f,c,callback){
    try{
        console.log("1")
        const  resultMarque = await marqueModel.find({"_id":m});
        const resultForniseur = await forniseurModel.find({"_id":f});
        const resultcategorie = await sousSousCategorieModel.find({"_id":c});
    
        if(resultMarque.length ===0){
            console.log("2")
            return callback("Marque not found");
        }
        if(resultForniseur.length ===0){
            console.log("3")
            return callback("Forniseur not found");
        }
        if(resultcategorie.length ===0){
            console.log("4")
            return callback("Categorie not found");
        }
        if(resultMarque.length >0 && resultForniseur.length >0 && resultcategorie.length >0){
            console.log("5")
            callback(null,true);
        }
    }catch(error){
        callback(error.message)  ;
    }
  


}

module.exports ={
    
                    createProduit,
                    findProduit,
                    deleteProduit,
                    updateProduit,
                    deleteImageProduit,
                    addImage,
                    addDescription,
                    deleteDescriptionProduit,
                    deleteAllProduit,
                    TestOfid,
                    deleteMarequeProduit,
                    deleteForniseurProduit,
                    deleteCategorieProduit

                }