const mongoose = require("mongoose");

const { Schema } = mongoose;

const offreProduitSheama = new Schema({
  order: { type: Number, unique: true, required: true },
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "produit",
  },
  image: String,
  pourcentage: { type: Number, default: 0, max: 100, min: 0 },
  livraison: { type: Boolean, default: false },
  count: { type: Number, default: null },
  countRest: { type: Number, default: null },
  offres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offre",
    },
  ],
  sliderOffre: { type: Boolean, default: false },
});

const OffreProduit = mongoose.model("OffreProduit", offreProduitSheama);

module.exports = OffreProduit;
