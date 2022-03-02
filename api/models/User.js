const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String, required:true,
    },
    lastname: {
        type: String, required:true, 
    },
    username: {
        type: String, required:true, unique: true
    },
    email: {
        type: String, required:true, unique: true
    },
    password: {
        type: String, required: true
    },
    resetLink: {
        data: String,
        default: ""
    },
    profilePic: {
        type: String, default: ""
    },
    isAdmin:{
        type:Boolean, default: false
    },
    isFan:{
        type:Boolean, default: false
    },
    isPatron:{
        type:Boolean, default: false
    },
    donation: {
        type: Number,
        default: 0

    },
    coverPicture: {
        type:String,
        default: "",
    },
    followers: {
        type:Array,
        default: [],
    },
    followings: {
        type:Array,
        default: [],
    },
    likes: {
        type:Array,
        default: [],
     },
    isSubscribed:{
        type: Boolean,
        default: false,
    },
    desc: {
        type:String,
        max: 120
    },
    country: {
        type: String,
        max:50
    },
    state: {
        type: String,
        max:50
    },
    phone: {
        type: Number,
       
    },
    accountNumber: {
        type: Number,
       
    },
    sponsorship: {
        type: Number,
        enum: [1, 2, 3, 4],
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);