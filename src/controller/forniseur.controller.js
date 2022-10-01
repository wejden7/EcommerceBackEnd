const {validationResult } = require('express-validator');

const {createForniseur,findForniseur,delteForniseur,updateForniseur} = require('../service/forniseur.service');


exports.createForniseur = async (req,res,next) => {
    
        const errors =validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({
                succses: false,
                message: 'There was an error creating the forniseur',
                errors : errors.array()

            });
        }

     await  createForniseur(req.body).
                then(result=>{
                    return res.status(200).send({
                        succses: true,
                        message: 'The forniseur was created successfully',
                        result: result
                    });

                }).catch(error=>{
                    return res.status(400).send({
                        succses: false,
                        message: 'There was an error creating the forniseur',
                        errors : error.message
                    });

                })
}

exports.findForniseurById = async(req, res, next) => {

    const {id} = req.params;
    var condition = {
        "_id":id
    }

    findForniseur(condition).
        then((forniseur) => {
            if(forniseur.length===0) throw new Error("Forniseur is empty");
             return res.status(200).send({
                succses: true,
                message: 'The forniseur was found',
                data: forniseur[0]
             });
        }).catch((error) => {
            return res.status(400).send({
                succses: false,
                message: 'There was an error finding the forniseur',
                errors : error.message
            });

        });

}

exports.findAllForniseur =async (req,res,next)=>{

    findForniseur({}).
        then((forniseur) => {
            if(forniseur.length===0) throw new Error("Forniseur is empty");
            return res.status(200).send({
                succses: true,
                message: 'The forniseur was found',
                data: forniseur.reverse()
            });
        }).catch((error) => {
            return res.status(400).send({
                succses: false,
                message: 'There was an error finding forniseur',
                errors : error.message
            });

        });

}

exports.deleteForniseur = async (req,res,next)=>{

    const {id} = req.params;

    var condition = {
        _id: id
    }
    delteForniseur(condition).
        then((result)=>{
            console.log(result) ;
            if(result.deletedCount===0) throw new Error("forniseur not found") ;
            return res.status(200).send({
                succses: true,
                message: 'The forniseur was deleted',
                data: result
            })

        }).catch((error)=>{
            return res.status(400).send({
                succses: false,
                message: 'There was an error deleting forniseur',
                errors : error.message
            });
        });
}
exports.deleteArrayForniseur = async (req,res,next)=>{
    const {forniseur} = req.body;
   
    var data=[]
 for await  (let id of forniseur){
        var condition = {
            _id: id
        }
      await  delteForniseur(condition).
        then((result)=>{
            console.log(result) ;
            if(result.deletedCount===0) throw new Error("forniseur not found") ;
            
            data.push({id:id,delete:true})

        }).catch((error)=>{
            data.push({id:id,delete:false})
        });
     
    }
   
    return res.status(200).send({
        succses: true,
        message: 'The forniseur was deleted',
        data: data
    })
}

exports.upadteForniseur = async (req, res, next)=>{

    const errors =validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({
                succses: false,
                message: 'There was an error creating the forniseur',
                errors : errors.array()

            });
        }
        const {name,email,tel,adresse} = req.body;

        if(!name && !email && !tel && !adresse) 
            return res.status(400).send({
                succses: false,
                message: 'data is required',
                errors : "data is empty",

        }); 

    const {id} = req.params;

    var condition = {
        _id: id
    }
    updateForniseur(condition ,req.body).
        then((result) => {
            console.log(result);
            if(!result) throw new Error("forniseur not found");
             return res.status(200).send({
                succses: true,
                message: 'The forniseur has been updated',
                data: result
             });
        }).catch((error) => {
            return res.status(400).send({
                succses: false,
                message: 'There was an error updating the forniseur',
                errors : error.message,
            });
        });


}