const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type :String,
        unique:true,
        required : true,
        trim : true,
        lowercase :true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },
    name:{ type:String ,uppercase:true, trim: true, required: true},
    address:{ type:String, default:"iamaddress" , uppercase:true},
    contact1:{ type:String, minlength:10, required: true},
    contact2:{ type:String, default:"0000000000"},
    password:{ type:String, minlength:6, maxlength:12, required : true},
    type:{type:Boolean},
    jobTypes: [{
        type:Number,
        required:true
    }]
});

userSchema.methods.toJSON = function () {
    const user =this
    const userObj=user.toObject()
    delete userObj.password
    return userObj
}

userSchema.pre('save', async function (next) {
    const user =this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()

})
const User = mongoose.model('user',userSchema);

module.exports = User;