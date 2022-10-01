const descriptionModel = require('../models/description.model');

async function createDescriptions(description,callback){
    let id=[];
    var i= 0
if(!description || description.length === 0)return callback(null,id);

    for await (const element of description) {
        i++;
       
        var data ={
            title:element.title,
            description:element.description
        }
        console.log(data)
        console.log("adding description " + i);
     await  descriptionModel(data).save().
        then(async description=>{
            console.log("adding description 1 " + i);
            id.push(description._id);

           // if(i==description.length)return callback(null, id);

        }).catch(error=>{
            return callback(error.message)
        });
    };
    return callback(null, id);

    
}
async function createDescription(description){
   
  return   await  descriptionModel(description).save();
   
}

async function findDescription(condition){

    return await descriptionModel.find(condition);
}

async function deleteDescription(condition){

    return await descriptionModel.findOneAndDelete(condition);
}

async function updateDescription(condition , description){

    return await descriptionModel.findOneAndUpdate(condition, description);
}

module.exports ={createDescription,findDescription,deleteDescription,updateDescription,createDescriptions}