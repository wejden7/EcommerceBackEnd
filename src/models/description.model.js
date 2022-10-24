const mongoose = require('mongoose');

const descriptionSchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

});

const descriptionModel = mongoose.model('description', descriptionSchema);

module.exports = descriptionModel; 