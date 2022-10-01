const {validationResult } = require('express-validator');

const { deleteImageProduit,addImage } = require("../service/produit.service");
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
        then(async resualt=>{

            return await deleteImageProduit({"_id": id_produit,},id_image)

        }).then(result=>{
            return res.status(200).send({
                success: true,
                message: "delete successfully",
                data: result

            });
        }).catch(error => {

            return res.status(500).send({
                success: false,
                message: "delete failed",
                errors: error.message
            });

        });

    

} 

exports.addImage = async (req, res, next)=>{

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return  res.status(400).json({ 
            success: false,
            message:'requieste invalide ',
            errors: errors.array() 
        });
    }
const {id, url} = req.body;

    var image = {
        "url": url,
    }
    await  createImage(image).
        then(async result=>{

           return await addImage({"_id":id},result._id)

        }).then(result=>{
            return res.status(200).
                send({
                    success: true,
                    message: "add Image successfully",
                    data: result
                });
        }).catch(error=>{
            return res.status(500).send({
                success: false,
                message: "add Image failed",
                errors: error.message
            });

        });



}

