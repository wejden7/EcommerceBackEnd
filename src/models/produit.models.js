const mongoose = require('mongoose');

const produitSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    prix:{
        type:Number,
        require:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    tva:{
        type:Number,
        required:true,
    },
    images:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "image"
    }],
    description:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "description"
    }],
    marque:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "marque"
    },
    forniseur:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "forniseur"
    },
    categorie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SousSousCategorie"
    }
    
});

const  produitModel = mongoose.model('produit',produitSchema);

module.exports = produitModel;