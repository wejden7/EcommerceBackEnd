const {validationResult } = require('express-validator');

const { deleteDescriptionProduit, addDescription,findProduit } = require("../service/produit.service");
const {deleteDescription,createDescription,updateDescription} = require("../service/description.services");

exports.deleteDescription =async (req, res,next)=>{
    console.log(req.body)

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
            findProduit({_id:id_produit}).then((p)=>{
                return res.status(200).
                send({
                    success: true,
                    message: "add description successfully",
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
            findProduit({_id:id}).then((p)=>{
                return res.status(200).
                send({
                    success: true,
                    message: "add description successfully",
                    data: p[0]
                });
            })
            
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
    const {id,_id, title,description} = req.body;

    var data = {
        "title": title,
        "description": description
    }
    var condition ={
        _id: _id
    }

    updateDescription(condition,req.body).
        then(result=>{

            findProduit({_id:id}).then((p)=>{
                return res.status(200).
                send({
                    success: true,
                    message: "add description successfully",
                    data: p[0]
                });
            })

        }).catch(error=>{
            return res.status(500).send({
                success: false,
                message: "update description failed",
                errors: error.message
            });

        });
}
