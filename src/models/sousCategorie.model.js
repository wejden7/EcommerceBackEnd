const mongoose = require('mongoose');

const sousCategorieShema = mongoose.Schema({
   
    label: {
      type:String,
      required:true,
      unique:true
    },
    categorie: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Categorie"
    },
    icon: {
      type:String,
   },
  });

const sousCategorieModel = mongoose.model('SousCategorie',sousCategorieShema)

module.exports = sousCategorieModel 