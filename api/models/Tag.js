const mongoose = require('mongoose');


const TagSchema = new mongoose.Schema(
    {  
        name: {
            type: String,
        },
        content: {
          type:Array,
          default: [],
      },
},
  {timestamps: true}
);

module.exports = mongoose.model("Tag", TagSchema);