const { request } = require('express');
const imageModel = require('../models/image.model');
async function createImage(image){
   data ={
        url:image
    }
    return await imageModel(data).save();
}

async function createImages(images,callback){

    let id=[];
    var i= 0
if(!images || images.length === 0)return callback(null,id);

    for await (const element of images) {
        i++;
        var data ={
            url:element.filename
        }
        console.log("adding image " + i);
     await  imageModel(data).save().
        then(async image=>{
            console.log("adding image 1 " + i);
            id.push(image._id);

          

        }).catch(error=>{
            return callback(error.message)

        });
    };
    return callback(null, id);
   
}

async function findImage(condition){

    return await imageModel.find(condition);
}

async function deleteImage(condition){

    return await imageModel.findOneAndDelete(condition);

}


module.exports ={createImage,findImage,deleteImage,createImages}