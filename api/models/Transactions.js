const mongoose = require('mongoose');


const TransactionSchema = new mongoose.Schema(
    {  
        userId: {
            type: String,
        },
        name: {
            type: String,
        },
        username: {
            type: String,
        },
        amount: {
          type:Number,
          default: 0,
        },
        status: {
          type: Boolean,
          default: false,
        },
},
  {timestamps: true}
);

module.exports = mongoose.model("Transaction", TransactionSchema);