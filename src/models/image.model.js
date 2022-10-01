const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({

    url:{
        type:String,
        required:true,
        unique:true
    },

});

const imageModel = mongoose.model('image', imageSchema);

module.exports = imageModel;