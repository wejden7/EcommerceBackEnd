const {validationResult } = require('express-validator');

const { deleteDescriptionProduit, addDescription } = require("../service/produit.service");
const {deleteDescription,createDescription,updateDescription} = require("../service/description.services");

exports.deleteDescription =async (req, res,next)=>{

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return  res.status(400).json({ 
            success: false,
            message:'requieste invalide ',
            errors: errors.array() 
        });
    }

    const {id_produit,id_description} = req.body;


  var   condition = {
        "_id": id_description,
    }

   await deleteDescription(condition).
        then(async resualt=>{

            return await deleteDescriptionProduit({"_id": id_produit,},id_description)

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

exports.addDescription = async (req, res, next)=>{

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return  res.status(400).json({ 
            success: false,
            message:'requieste invalide ',
            errors: errors.array() 
        });
    }
const {id, title,description} = req.body;

    var data = {
        "title": title,
        "description": description
    }
    await  createDescription(data).
        then(async result=>{

           return await addDescription({"_id":id},result._id)

        }).then(result=>{
            return res.status(200).
                send({
                    success: true,
                    message: "add description successfully",
                    data: result
                });
        }).catch(error=>{
            return res.status(500).send({
                success: false,
                message: "add description failed",
                errors: error.message
            });

        });



}

exports.updateDescription = async (req, res, next)=>{

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return  res.status(400).json({ 
            success: false,
            message:'requieste invalide ',
            errors: errors.array() 
        });
    }
    const {title, description,id} = req.body;
    
    var condition ={
        "_id": id
    }

    updateDescription(condition,req.body).
        then(result=>{

            return res.status(200).send({
                success: true,
                message: "update description successfully",
                data: result
            })

        }).catch(error=>{
            return res.status(500).send({
                success: false,
                message: "update description failed",
                errors: error.message
            });

        });
}
