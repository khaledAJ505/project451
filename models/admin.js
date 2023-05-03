const mongoose = require('mongoose');
const patient = require('./patient');
const personnel = require('./medicalp');

const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const AdminSchema = new Schema({
    Fullname:{type:String,required:true},
    ID:{type:Number,required:true},
    phoneno:{type:Number,required:true},
    email: {type: String,required: true,unique: true},
    patients: [{
        type: Schema.Types.ObjectId,
        ref: 'patient'
    },],

    personnels: [{
        type: Schema.Types.ObjectId,
        ref: 'personnel'
    },]  
    
});

AdminSchema.plugin(passportLocalMongoose);


const Admin = mongoose.model('Admin', AdminSchema);
const username ='ali111';
const password= '123';

const inject=async()=>{
await Admin.deleteMany({});
const p= new Admin({Fullname:'Ali L Hussien',ID:11111111,phoneno:76000000,email:'alilhussien@gmail.com',username:username,password:password});
await Admin.register(p, password);
}
inject();
module.exports=Admin;