import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true, 
    },
    fullname:{
        type:String,
        required:true,
        lowercase:true,
        trim:true, 
        index:true 
    },
    avatar:{
        type:String,//cloudinary url
        required:true,
    },
    coverImage:{
        type:String,//cloudinary 
    },
    watchHistory:[
        {
       type:mongoose.Schema.Types.ObjectId,
       ref:"video"
        }
    ],
    password:{
      type:String,
      required:true
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true})

//using bcryptfor encryption of password
UserSchema.pre("save",async function(next){
    if(!this.isModified("password") ) return next();
    //but the prblm here is whenever any field will change it everytime change the pass so will have to apply if cond here
    this.password=await bcrypt.hash(this.password,10);
    next()
})

//bcrypt also checks whether pass is corrcrt or not and we can write our own custom methods 
UserSchema.methods.ispasscorrect= async function (password){
 return await  bcrypt.compare(password,this.password);
}


//acess token
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};


//refresh token 
UserSchema.methods.genRefreshtoken= function(){
   return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User=mongoose.model("User",UserSchema)