const mongoose = require('mongoose');
const moment = require('moment-timezone');
const today = new Date()
today.setHours(0,0,0,0)
const DateNew = moment.tz(today.setDate(today.getDate()+1), "Africa/Tunis");
const DateNewDay = moment.tz(today.setDate(today.getDate()+1), "Africa/Tunis");
const {Schema} = mongoose;
 
const offreSchema = new Schema({
   order:{type:Number,unique:true,required:true},
   label:{type:String,required:true},
   image:String,
   dateTimeDebut:{type:Date,default:DateNew},
   dateFin:{type:Date,default:DateNewDay},
   chrono : { type: Boolean, default: false },
   sliderOffre: { type: Boolean, default: false },
});


const Offre = mongoose.model('Offre',offreSchema)

module.exports = Offre;

// deux type of offre 
// 1- offre  : slideroffre = true
// 2- sous Offre : slideroffre = false