const marqueModel = require('../models/marque.model')

async function createMarque(data){

    return new marqueModel(data).save();
}
async function findMarque(condition){

    return await marqueModel.find(condition);
}

async function deleteMarque(condition){

    return await marqueModel.deleteMany(condition);
}
async function updateMarque(condition,data){

    return await marqueModel.findByIdAndUpdate(condition,data,{new:true});
}


module.exports = {
    createMarque,
    findMarque,
    deleteMarque,
    updateMarque
}