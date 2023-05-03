const mongoose = require('mongoose');
const patient = require('./patient');
const admin = require('./admin');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const MedicalSchema = new Schema({
    Fullname:{type:String,required:true},
    ID:{type:Number,required:true},
    phoneno:{type:String,required:true},
    email: {type: String,required: true,unique: true},
    patients: [{
        type: Schema.Types.ObjectId,
        ref: 'patient'
    },]
    
});

MedicalSchema.plugin(passportLocalMongoose);


const Personnel = mongoose.model('Personnel', MedicalSchema);
const username ='mostal123';
const password= 'mostafa111';

const inject=async()=>{
await Personnel.deleteMany({});
const p= new Personnel({Fullname:'Mostafa Alloush',ID:202111111,phoneno:"76000000",email:'mostafa@gmail.com',username:username,password:password});
const regp = await Personnel.register(p, password);
const ad = await admin.findOne({ username: 'ali111' }).exec();
ad.personnels.push(regp);
await ad.save();

}
inject();
module.exports=Personnel;
