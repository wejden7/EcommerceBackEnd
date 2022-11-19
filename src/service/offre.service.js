const offreModel = require("../models/offre.model");

async function create(data) {
  return new offreModel(data).save();
}

async function find(condition) {
  return await offreModel.find(condition);
}

async function deleteOffre(id) {
  return await offreModel.findByIdAndDelete({ _id: id });
}

async function update(condition, data) {
  return await offreModel.findByIdAndUpdate(condition, data, { new: true });
}

module.exports = {
  create,
  find,
  deleteOffre,
  update,
};
