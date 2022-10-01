const { validationResult } = require("express-validator");
const deleteFile = require("../utils/delete.utils");
const {
  createProduit,
  addImage,
  addDescription,
  findProduit,
  deleteProduit,
  deleteAllProduit,
  updateProduit,
  TestOfid,
} = require("../service/produit.service");
const { createImages, deleteImage } = require("../service/images.service");
const {
  createDescriptions,
  deleteDescription,
} = require("../service/description.services");

// Function create New produit
exports.createProduit = async (req, res, next) => {
  const errors = validationResult(req.body); // validator des chant input not work car validator expreese not work avec de FormData work only whith json

  // Condition pour detect les Error de chont input et return respance
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "requieste invalide ",
      errors: errors.array(),
    });
  }

  var catchError = false; // Variable pour catch les error
  var messageError = ""; // Variable pour done le message de l'Error catch

  const {
    name,
    prix,
    quantity,
    tva,
    description,
    marque,
    forniseur,
    categorie,
  } = req.body; // recupertion le donne de requeste

  var descriptions = JSON.parse(description); // transfere un tableau a json

  const imageNames = req.files; // requperation le files image que save a storege de server

  var produit = {
    name: name,
    prix: prix,
    quantity: quantity,
    tva: tva,
    marque: marque,
    forniseur: forniseur,
    categorie: categorie,
  }; // colecton d'un produit pour save

  var condition = { name: name }; // Condition pour test les name de produit existe

  // lance le Test de existe de name
  findProduit(condition).then(async (result) => {
    //test si result.length ===1 danc lesname exist donc return respance avec msg le name existe
    if (result.length === 1) {
      // avant return respance ande exist il faut delete tout le file que enregistre  avent
      for await (let image of imageNames) {
        deleteFile("./storage/images/" + image.filename);
      }
      return res.status(400).send({
        success: false,
        message: "exist",
        result: result,
      });
    } else {
      //else si neExiste test tout le id exist si il a un id nexiste retur respance avec msg forinkey error

      await TestOfid(marque, forniseur, categorie, async (error, result) => {
        if (error) {
          // avant return respance ande exist il faut delete tout le file que enregistre  avent
          for await (let image of imageNames) {
            deleteFile("./storage/images/" + image.filename);
          }
          return res.status(400).send({
            success: false,
            message: "ForienKey failed",
            errors: error,
          });
        }

        //si aucun error existe creat produit
        await createProduit(produit)
          .then(async (result) => {
            //produit created
            var condition = {
              _id: result._id,
            };
            const id_produit = result._id;
            // creat tout le file que savet avant avect le meme nam dont image
            await createImages(imageNames, async (error, result) => {
              //catch un error de creat image
              if (error) {
                catchError = true;
                messageError = error;
              }
              //tout les images creat et return result avec le id de images
              // add les id des image a produit
              console.log(result);
              await addImage(condition, result)
                .then(() => {
                  console.log("await0");
                })
                .catch((error) => {
                  //catch les error
                  catchError = true;
                  messageError = error.message;
                });
            });
            // creat les description dant table decription
            await createDescriptions(descriptions, async (error, result) => {
              //catch les error
              if (error) {
                catchError = true;
                messageError = error;
              }
              //creat le description  et return  les result avec les id

              console.log(result);
              //add le id de description a produit
              await addDescription(condition, result)
                .then(() => {})
                .catch((error) => {
                  //catch les error
                  catchError = true;
                  messageError = error.message;
                });
            });

            // si catchError et true donc il fant lance le midelexer avec next(error) error pour sipreme le produit avec le image el les description
            if (catchError) {
              req.id = id_produit;
              req.messageError = messageError;
              return next("error ");
            }
            //si no le produit creat avec success
            return res.status(200).send({
              success: true,
              message: "Success created",
              result: result,
            });
          })
          .catch(async (error) => {
            //catch les error ou cour de cration de produit  il faut delete tou le file avnt return respance error
            console.log("catch error: " + error);
            for await (let image of imageNames) {
              deleteFile("./storage/images/" + image.filename);
            }
            return res.status(400).json({
              success: false,
              message: "requieste invalide ",
              errors: error.message,
            });
          });
      });
    }
  });
};

exports.findProduit = async (req, res, next) => {
  const { id } = req.params;

  if (id) {
    var condition = {
      _id: id,
    };
  } else {
    var condition = {};
  }

  findProduit(condition)
    .then((result) => {
      return res.status(200).send({
        success: true,
        message: "success",
        result: result,
      });
    })
    .catch((error) => {
      return res.status(401).send({
        success: false,
        message: "error  ",
        errors: error.message,
      });
    });
};

exports.deleteProduit = async (req, res, next) => {
  const { id } = req.params;

  var condition = {
    _id: id,
  };
  console.log("delete producer");
  findProduit(condition)
    .then(async (result) => {
      if (result.length == 0) {
        throw TypeError("producer not found");
      }

      images = result[0].images;

      for await (let image of images) {
        await deleteImage(image)
          .then(() => {})
          .catch((err) => {});
      }

      const descriptions = result[0].description;
      for await (let description of descriptions) {
        await deleteDescription(description)
          .then(() => {})
          .catch((err) => {});
      }

      return await deleteProduit(condition);
    })
    .then((result) => {
      return res.status(200).send({
        success: true,
        message: "delete Produit",
        data: result,
      });
    })
    .catch((error) => {
      return res.status(401).send({
        success: false,
        message: "error  ",
        errors: error.message,
      });
    });
};

exports.deleteAllProduit = async (req, res, next) => {
  deleteAllProduit((error, result) => {
    if (error)
      return res.status(500).send({
        success: false,
        message: "Error  of deleting  ",
        errors: error,
      });
    return res.status(200).send({
      success: true,
      message: "deleting  successfully ",
      data: result,
    });
  });
};

exports.updateProduit = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "requieste invalide",
      errors: errors.array(),
    });
  }
  var condition = {
    _id: req.params.id,
  };

  updateProduit(condition, req.body)
    .then((result) => {
      return res.status(200).send({
        success: true,
        message: "updated successfully",
        data: result,
      });
    })
    .catch((error) => {
      return res.status(200).send({
        success: false,
        message: "updated failed",
        errors: error.message,
      });
    });
}; 

/*exports.deleteAllProduit =async (req,res,next) => {




 await   findProduit({}).
            then(async (result)=>{

                if(result.length === 0)throw TypeError("Table produit is empty");

                for await (produit of result) {
                 
                    var condition ={
                        '_id':produit._id
                    }
                    console.log("delete producer");
                  await  findProduit(condition).
                        then(async(result) => {
            
                        if(result.length==0){
            
                            throw TypeError("producer not found");
                        }
                            
            
                           
                            images=result[0].images;
                           
                            for await (let image of images) {
            
                                
                                await deleteImage(image).
                                    then(() => {
                                      
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
            
                           
            
                        }).catch(error => {
            
                          
            
                            return res.status(401).send({ 
                                success: false,
                                message: "error  ",
                                errors: error.message
                             });
            
                        });
                }
                return res.status(200).send(
                    {
                        success: true,
                        message: "delete Produit",
                        data: result
                    }
                );


            }).catch((error)=>{

                return res.status(401).send({
                        success: false,
                        message: "delete All failed  ",
                        errors: error.message
                });

            });

 }
*/
 