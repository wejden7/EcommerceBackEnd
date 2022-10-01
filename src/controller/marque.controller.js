const {validationResult } = require('express-validator');
const deleteFile = require('../utils/delete.utils')
const { findProduit ,deleteMarequeProduit } = require('../service/produit.service');

const {
    createMarque,
    findMarque,
    deleteMarque,
    updateMarque
} = require("../service/marque.service");

exports.createMarque =  async (req, res, next) => {

    const errors = validationResult(req.body);

    if(!errors.isEmpty()) {
        deleteFile('./storage/logos/'+req.file.filename)
        return res.status(400).send({
            success: false,
            message: 'There was an error creating the marque',
            errors: errors.array()
    
        });
    }
    if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Error of logo ",
        });
      }
    
    
    
      req.body.logo = req.file.filename;
   

    createMarque(req.body).
        then(result=>{
            return res.status(200).send({
                success: true,
                message: 'The marque has been created',
                data: result
            })

        }).catch(error=>{   deleteFile('./storage/logos/'+req.file.filename)

            return res.status(400).send({
                success: false,
                message: 'There was an error creating the marque',
                errors: error.message
            });

        })


}

exports.findMarqueById= async (req,res,next)=>{

  const   {id} = req.params;

   var condition = {
    "_id": id
   }
   findMarque(condition).
        then(result=>{

            if(result.length==0)throw new Error("marque not found");
            return res.status(200).send({
                success: true,
                message: 'The marque has been found',
                data: result[0]
            });

        }).catch(error=>{
            return res.status(400).send({
                success: false,
                message: 'There was an error finding the marque',
                errors: error.message
            });
        });


}

exports.findMarque  = async (req,res, next)=>{

    findMarque({}).
        then(result=>{
            return res.status(200).send({ 
                success: true,
                message: 'The marque has been found',
                data: result
            })
        }).catch((error)=>{
            return res.status(400).send({
                success: false,
                message: 'There was an error finding the marque',
                errors: error.message
            });
        });
}

exports.deleteMarqueById =async (req, res, next)=>{

    const   {id} = req.params;

    var condition = {
        "_id": id
    }

    await   findProduit({"marque":id}).
        then(async(result)=>{
          for await (let produit of result){
           await deleteMarequeProduit({"_id": produit.id})
            }
        }).catch((error)=>{
            console.log(error.message);
        })

    await findMarque(condition).
    then(result=>{
        deleteFile('./storage/logos/'+result[0].logo)
       
    });

  await  deleteMarque(condition).
        then((result)=>{
           
            return res.status(200).send({
                success: true,
                message: 'The marque has been deleted',
                data: result
            });
        }).catch((error)=>{
            return res.status(400).send({
                success: false,
                message: 'There was an error deleting the marque',
                errors: error.message
            });
        });
}

exports.deleteMarque =async (req, res, next)=>{

    

    deleteMarque({}).
        then((result)=>{
            return res.status(200).send({
                success: true,
                message: 'The marque has been deleted',
                data: result
            });
        }).catch((error)=>{
            return res.status(400).send({
                success: false,
                message: 'There was an error deleting the marque',
                errors: error.message
            });
        });
}

exports.updateMarque = async (req, res, next)=>{
    const errors = validationResult(req.body);

    if(!errors.isEmpty()) 
    return res.status(400).send({
        success: false,
        message: 'There was an error creating the marque',
        errors: errors.array()

    });

    const   {id} = req.params;

    

    var condition = {
        "_id": id
    }
    if (req.file) {
        deleteFile("./storage/logos/" + req.body.logoNameExist);
        var data = {
          label: req.body.label,
          logo: req.file.filename,
        };
      }
      if (!req.file) {
        var data = {
          label: req.body.label,
        };
      }

    updateMarque(condition,data).
        then((result)=>{
            if(!result) throw new Error('marque not found');
            return res.status(200).send({
                success: true,
                message: 'The marque has been updated',
                data: result
            });
        }).catch((error)=>{
            deleteFile("./storage/logos/" + req.file.filename);
            return res.status(400).send({
                success: false,
                message: 'There was an error updating the marque',
                errors: error.message
            });
        });
}