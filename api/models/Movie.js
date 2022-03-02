const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true
    },
    username: {
        type: String,
    },
   comments: {
       type: [
           {
           userId: {
                type:String,
                required:true
            },
            username: {
                type: String,
            },
           body: {
            type: String, required:true,
           },
           
            reply: {
            type: []
           },
        }
    ]
   },
   profilePic: {
    type: String, default: ""
},
   credit: {
       type: Number,
       default: 0,
   },
     likes: {
       type:Array,
       default: [],
    },
    title: {
        type: String,
    },
    desc: {
        type: String, required:true,
    },
    img: {
        type: String
    },
    // imgTitle: {
    //     type: String
    // },
    // imgSm:{
    //     type: String
    // },
    votes: {
        type: Array,
        default: [],
    },
    // trailer:{
    //     type: String
    // },
    video:{
        type: String
    },
    // year:{
    //     type: String
    // },
    // limit:{
    //     type: String
    // },
    // genre:{
    //     type: String
    // },
    isChallenge:{
        type: Boolean, default: false
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);