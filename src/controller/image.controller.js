const {validationResult } = require('express-validator');
const deleteFile = require("../utils/delete.utils");
const { deleteImageProduit,addImage,findProduit } = require("../service/produit.service");
const {deleteImage,createImage} = require("../service/images.service");

exports.deleteImage =async (req, res,next)=>{

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return  res.status(400).json({ 
            success: false,
            message:'requieste invalide ',
            errors: errors.array() 
        });
    }

    const {id_produit,id_image} = req.body;


    condition = {
        "_id": id_image,
    }

   await deleteImage(condition).
        then(async image=>{ 
            deleteFile('./storage/images/'+image.url)

            return await deleteImageProduit({"_id": id_produit,},id_image)

        }).then(result=>{
            findProduit({_id:id_produit}).then((p)=>{
                return res.status(200).
            send({
                success: true,
                message: "add Image successfully",
                data: p[0]
            });
            })
        }).catch(error => {

            return res.status(500).send({
                success: false,
                message: "delete failed",
                errors: error.message
            });

        });

    

} 

exports.addImage = async (req, res, next)=>{

    const errors = validationResult(req.body);
    
    if (!errors.isEmpty()) {
        return  res.status(400).json({ 
            success: false,
            message:'requieste invalide ',
            errors: errors.array() 
        });
    }
const {id} = req.body;

    var image = {
        "url": url,
    }
    console.log(req.body);
    console.log(req.files);
    console.log(req.file);
    for await(image of req.files ){
        await  createImage(image.filename).
        then(async result=>{

           return await addImage({"_id":id},result._id)

        })
    }
    findProduit({_id:id}).then((p)=>{
        return res.status(200).
    send({
        success: true,
        message: "add Image successfully",
        data: p[0]
    });
    }).catch(error=>  res.status(501).
    send({
        success: true,
        message: "add Image Erorr",
        error: error
    }))

    
   



}

