const mongoose = require('mongoose');
const validator = require('validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type :String,
        unique:true,
        trim : true,
        lowercase :true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },
    username:{ type:String ,uppercase:true, trim: true, required: true},
    address:{ type:String, default:"iamaddress" , uppercase:true},
    contact1:{ type:String, minlength:10},
    contact2:{ type:String, minlength:10},
    type:{type:Boolean},
    jobTypes: [{
        type:Number,
        required:true
    }],
    googleID : { type:String , required:true},
    thumbnail : String
});

userSchema.methods.toJSON = function () {
    const user =this
    const userObj=user.toObject()
    delete userObj.password
    return userObj
}


const User = mongoose.model('user',userSchema);

module.exports = User;