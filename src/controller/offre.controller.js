const deleteFile = require("../utils/delete.utils");

const {
  create,
  find,
  deleteOffre,
  update,
} = require("../service/offre.service");

exports.errorHandler = async (error, req, res, next) => {
  let message = "something went wrong";
 
  if (
    error.value?._id &&
    error?.path === "_id" &&
    error?.valueType === "Object"
  )
    message = error.value?._id + " not found";
  if (
      error.message?.value &&
      error.message?.path === "_id" &&
      error.message?.valueType === "string"&&
      error.message?.name === "CastError"
    )
      message = error.message?.value + " failed for value";

  if (
    error.keyValue?.order != null &&
    error?.name === "MongoServerError" &&
    error?.code === 11000
  )
    message = "Order must be unique " + error.keyValue.order + " exists";

  if (
    error.keyValue?.order != null &&
    error?.codeName === "DuplicateKey" &&
    error?.code === 11000
  )
    message = "Order must be unique " + error.keyValue.order + " exists";

  return res.status(501).json({
    success: false,
    message: message,
    error: error?.message,
  });
};
exports.createController = async (req, res, next) => {
  let { order, label, dateTimeDebut, dateFin, chrono } = req.body;

  req.body.image = req.file?.filename;

  await create(req.body)
    .then(async(offre) => {
        return res.status(200).json({
          success: true,
          message: "Data criado com sucesso",
          data: offre,
        });
    })
    .catch((error) => {
      deleteFile("./storage/images/" + req.file?.filename);
      next(error);
    });
};

exports.findController = async (req, res, next) => {
  await find({})
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "Data Find",
        data: result,
      });
    })
    .catch((error) => next(error));
};

exports.deleteController = async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next({ message: "id not provided" });

  deleteOffre(id)
    .then((result) => {
      if (!result) next({ message: `${id} not found` });
      deleteFile("./storage/images/" + result.image);
      return res.status(200).json({
        success: true,
        message: "Offre deleted",
        data: result,
      });
    })
    .catch((error) => next(error));
};

exports.updateController = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next({ message: "id not provided" });

 
  const condition = { _id: id };
  
  const { order, ...other } = req.body.data;
  const offreExiste = await find({ order: order });

  if (offreExiste.length === 0 || offreExiste[0]._id.equals(id)) {
    await update(condition, req.body.data)
      .then(async (result) => {
        if (!result) return next({ message: `${id} not found` });
        return res.status(200).json({
          success: true,
          message: "Offre update sans change order",
          order:false,
          data: result,
        });
      })
      .catch((error) => next(error));
  } else {
    update(condition, other)
      .then((result) => {
        if (!result) return next({ message: `${id} not found` });
        req.idUpdate = result._id;
        req.idExiste = offreExiste[0]._id;

        next();
      })
      .catch((error) => next(error));
  }
};

exports.changeOrderController = async (req, res, next) => {
  const { idUpdate, idExiste } = req;

  const conditionUpdate = { _id: idUpdate };
  const conditionExiste = { _id: idExiste };

  const offreUpdate = await find(conditionUpdate);
  const offreExiste = await find(conditionExiste);

  const dataZero = { order: 0 };

  const dataUpdate = { order: offreUpdate[0]?.order };
  const dataExiset = { order: offreExiste[0]?.order };

  update(conditionUpdate, dataZero)
    .then(async (res) => {
      console.log(res);
      if (!res) return next({ message: `${id} not found 1` });

      return await update(conditionExiste, dataUpdate);
    })
    .then(async (res) => {
      console.log(res);
      if (!res) return next({ message: `${id} not found 2` });

      return await update(conditionUpdate, dataExiset);
    })
    .then(async(resualt) => {
      const offreUpdate = await find(conditionUpdate);
      const offreExiste = await find(conditionExiste);
      return res.status(200).json({
        success: true,
        message: "Offre update and chnaged order",
        order:true,
        offreUpdate: offreUpdate[0],
        offreExiste: offreExiste[0],
      });
    })
    .catch((error) => next(error));
};

exports.updateImageController = async (req, res, next) => {
  const { id } = req.params;

  if (!req.file?.filename) return next({ message: "image not provided" });

  const condition = { _id: id };

  await find(condition)
    .then(async (result) => {
      if (result.length===0) throw new Error('offre not found 1');
      
      deleteFile("./storage/images/" + result[0]?.image);

      return await update(condition, { image: req.file?.filename });
    })
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: "image Offre update success",
        data: result, 
      });
    }) 
    .catch((error) => {
      deleteFile("./storage/images/" + req.file?.filename);
      return next({ message: error.message });
    }); 
};
