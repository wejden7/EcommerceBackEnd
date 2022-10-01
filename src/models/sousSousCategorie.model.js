const mongoose = require('mongoose');

const sousSousCategorieShema = mongoose.Schema({
   
    label: {
      type:String,
      required:true,
      unique:true
    },
    souscategorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SousCategorie"
       }
,
       icon: {
        type:String,
     },
  
  });


  const sousSousCategorieModel = mongoose.model('SousSousCategorie',sousSousCategorieShema)

  module.exports = sousSousCategorieModel