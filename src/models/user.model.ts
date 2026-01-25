import mongoose from "mongoose";

// user schema
const user_schema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "user first_name is required"],
      trim:true
    },
    last_name: {
      type: String,
      required: [true, "user last_name is required"],
      trim:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,'user already exists with provided email'],
        trim:true
    },
     password:{
        type:String,
        required:[true,'email is required'],
        minLength:[6,'password must be atleast 6 char. long']
    },
    role:{
        type:String,
        enum:['ADMIN','USER'],
        default:'USER'
    },
    active:{
        type:Boolean,
        default:false
    },
    // profile_image:{
        
    // }
    
  },
  { timestamps: true },
);

//! user model
const User = mongoose.model('user',user_schema)
export default User