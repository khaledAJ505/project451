const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const PatientSchema = new Schema({
    Fullname:{type:String,required:true},
    DOB:{type:String,required:true},
    ID:{type:Number,required:true},
    phoneno:{type:String,required:true},
    email: {type: String,required: true,unique: true},
    City:{type: String,required: true},
    Country:{type: String,required: true},
    medcondition : String,
    vaccine1:Boolean,
    vaccine2:Boolean,
    assignedtimeslotv1:String,
    assignedtimeslotv2:String,

});

PatientSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Patient', PatientSchema);