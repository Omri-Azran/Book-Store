import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'


const isAlphaa = (value) =>{ if (!validator.isAlpha(value)) {
    throw new Error('Only letters can be used');
}}


const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
        validate(value) {
            isAlphaa(value)
    }
},
    lastname:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
        validate(value) {
            isAlphaa(value)
    }
},
    email:{
        type:String,
        lowercase:true,
        required:true,
        trim:true,
        unique:[true, 'Email is taken'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value) {
            if (!validator.isStrongPassword(value, {minSymbols: 0})) {
                throw new Error('Password must contain Upper and lower case letters and numbers');
            }
    },
},
    tokens:[{
      token:{
          type:String,
          required:true,
      }  
    }],
},
{
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true,
    }

}
);


userSchema.methods.GenerateToken = async function(){
    const userModel_ = this;
    const token = jwt.sign({_id:userModel_._id}, "imAtokenWooHoo")// process.env.SECRET_TOKEN
    userModel_.tokens.push({token:token})
    await userModel_.save();
    return token;
}

userSchema.statics.getUserByEmailAndPass = async (email, password) => {
    //get user with this email
    const User = await UserModel.findOne({ email: email });
    if (!User) {
        throw new Error('Unable to login email' + email);
    }
    //match password of found user (that is hashed using bcrypt) with password provided in the function
    const isPasswordMatch = await bcrypt.compare(password, User.password);
    if (!isPasswordMatch) throw new Error('Unable to login password');

    return User;
};

userSchema.pre('save', async function(next){
    const userModel_ = this;
    if(userModel_.isModified('password')){
        userModel_.password = await bcrypt.hash(userModel_.password, 8)
    }
    next();
})

userSchema.virtual('VirtualCart', {
    ref:'CartModel',
    localField:'_id',
    foreignField:'ownerID',
})


const UserModel = mongoose.model('UserData', userSchema);

export default UserModel;