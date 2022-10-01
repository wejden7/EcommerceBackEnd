const mongoose = require('mongoose');

const marqueShema = mongoose.Schema({
   
   label: {
      type:String,
      required:true,
      unique:true
   },
   logo: {
      type:String,
      required:true,
      unique:true
   }
  
  });


  const marqueModel = mongoose.model('marque',marqueShema)

  module.exports = marqueModel 