const { validationResult } = require("express-validator");
const deleteFile = require("../utils/delete.utils");
const {
  createProduit,
  findProduit,
  deleteProduit,
  deleteAllProduit,
  updateProduit,
  TestOfid,
  existProduit,
  addImage
} = require("../service/produit.service");
const {createImage ,deleteImage } = require("../service/images.service");
const { deleteDescription } = require("../service/description.services");

exports.createProduit = async (req, res, next) => {
  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    deleteFile('./storage/images/'+req.file.filename)
    return res.status(400).json({
      success: false,
      message: "requieste invalide ",
      errors: errors.array(),
    });
  }
  console.log(req.body)
  console.log(req.file.filename)

  const { name, marque, forniseur, categorie } = req.body;

  var condition = { name:  new RegExp('^'+name+'$', "i") };

  const _existeProduit = await existProduit(condition);

  if (_existeProduit) {
    deleteFile('./storage/images/'+req.file.filename)

    return res.status(404).json({
      success: false,
      message: "Produit has been Existe",
      errors: `${name} has been Existe,`,
    });
  } 

  await TestOfid(marque, forniseur, categorie, async (error, result) => {
    if(error){
    deleteFile('./storage/images/'+req.file.filename)

      return res.status(404).json({
        success: false,
        message: "Constraint Error",
        errors: `${error}`,
      });
    }  
   
   await createProduit(req.body)
      .then(async (result) => {  
        const condition = {_id:result._id}
        await createImage(req.file.filename)
        .then(async(result)=>{
          await addImage(condition,result._id)
        }).catch((error)=>{
          deleteFile('./storage/images/'+req.file.filename)
        })
       
        findProduit(condition).then((p) => {
          return res.status(200).send({
            success: true,
            message: "Success created",
            data: p[0],
          });
        });
      })
      .catch(async (error) => {
    deleteFile('./storage/images/'+req.file.filename)
        return res.status(400).json({
          success: false,
          message: "requieste invalide ",
          errors: error.message,
        });
      });
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
        deleteFile('./storage/images/'+image.url)
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
  console.log(req.body)
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
  console.log(req.body);

  updateProduit(condition, req.body.data)
    .then((result) => {
      findProduit(condition).then((p) => {
        return res.status(200).send({
          success: true,
          message: "Success created",
          data: p[0],
        });
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