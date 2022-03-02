const mongoose = require('mongoose');


const ChallengeSchema = new mongoose.Schema(
    {  
        userId: {
            type:String,
            required:true
        },  
        title: {
            type: String, required:true,
        },
        desc: {
            type: String, required:true,
        },
        img: {
            type: String
        },
        prize:{
            type: Number, required:true,
        },
        
},
  {timestamps: true}
);

module.exports = mongoose.model("Challenge", ChallengeSchema);