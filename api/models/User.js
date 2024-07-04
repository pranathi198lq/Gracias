const mongoose= require("mongoose")

const UserSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min:3, 
        max:20,
        unique:true
    },
    email:{
        type:String,
        required: true,
        max:50,
        unique: true,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type: Array,
        default:[],
    },
    followings:{
        type: Array,
        default:[],
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        default:"",
        max: 50,
    },
    city: {
        type: String,
        default:"",
        max: 50,
    },
      sign: {
        type: String,
        default:"",
        max: 50,
      },
      relationship: {
        type: String,
        max: 50,
        default: "Single",
      },
      age: {
        type: Number,
      },
      hobbies: {
        type: String,
        max: 60,
        default: "Too many fun things",
      },
      saved:{
        type: Array,
        default: [],
      }
}, {timestamps: true}
);

module.exports= mongoose.model("User", UserSchema);
