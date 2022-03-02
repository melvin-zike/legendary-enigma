const router = require('express').Router();
const Transaction = require('../models/Transactions');
const User = require('../models/User');
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {

    const newTransaction = new Transaction(req.body);
    try {
      const savedTransaction = await newTransaction.save();
     return res.status(201).json(savedTransaction);
    } catch (err) {
      return res.status(500).json(err);
    }
  
});

//GET ALL TRANSACTIONS

router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin ) {
      try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });

  //DELETE
router.delete("/:id", verify, async (req, res) => {
  if(req.user.isAdmin){
      try{
          await Transaction.findByIdAndDelete(req.params.id);
          res.status(200).json(" Transaction has been deleted...");
          
      }catch(err){
          res.status(500).json(err);
      }
  }else{
      res.status(403).json('You can delete only your account!')
  }
})
  //Update Transaction Status
  router.put("/:id/update", verify, async (req, res) => {
    const newStatus = req.body.status;
    const id = req.params.id;
    if(req.user.isAdmin){   
        try{
            await Transaction.findById(id, (error, updatedTransaction) =>  {
                updatedTransaction.status = newStatus;
                updatedTransaction.save();
                return res.status(200).json(updatedTransaction);
            })
                }catch(err){
            return res.status(500).json(err);
        }
    }else{
       return res.status(403).json('You can update only your account!')
    }
});


module.exports = router;