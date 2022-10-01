const {validationResult } = require('express-validator');
const deleteFile = require('../utils/delete.utils')

const {findProduit,deleteProduit } = require("../service/produit.service");
const {deleteImage} = require("../service/images.service");
const {deleteDescription} = require("../service/description.services");


exports.creatProduitError= async (err,req,res,next) => {
    
    
    console.log("delete Produit Error",err);
   
        var condition ={
            '_id':req.id
        }
        console.log("delete producer");
        findProduit(condition).
            then(async(result) => {

            if(result.length==0){

                throw TypeError("producer not found");
            }
                

               
                images=result[0].images;
               
                for await (let image of images) {

                    
                    await deleteImage(image).
                        then((result) => {
         deleteFile('./storage/images/'+result.url)
         
                          
                          
                        }).catch((err) => {
                           
                        }) ;

                }
               

               
                descriptions=result[0].description;
                for await (let description of descriptions) {


                    await deleteDescription(description).
                        then(() => {
                          
                        }).catch((err) => {
                          
                        }) ;

                }
               
               
        
           return await deleteProduit(condition);

            }).then(result =>{

                return res.status(501).send(
                    {
                        success: false,
                        message: " created failed",
                        error : req.messageError
                    }
                );

            }).catch(error => {

              

                return res.status(401).send({ 
                    success: false,
                    message: "error  ",
                    errors: error.message
                 });

            });
   


}