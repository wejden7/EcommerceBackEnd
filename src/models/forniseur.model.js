const mongoose = require('mongoose');

const forniseurSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
    },
    tel:{
        type:Number,
        required:true,
    },
    adresse:{
        type:String,
        required:true,

    },
});

const  forniseurModel = mongoose.model('forniseur',forniseurSchema);

module.exports = forniseurModel;