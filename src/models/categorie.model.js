const mongoose = require('mongoose');

const categorieShema = mongoose.Schema({
   
   label: {
      type:String,
      required:true,
      unique:true
   },
   icon: {
      type:String,
   },
  
  });


  const categorieModel = mongoose.model('Categorie',categorieShema)

  module.exports = categorieModel 