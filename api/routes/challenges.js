const router = require("express").Router();
const Challenge = require("../models/Challenge");
const User = require('../models/User');
const verify = require("../verifyToken");



//CREATE

router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin ) {
    const newChallenge = new Challenge(req.body);
    try {
      const savedChallenge = await newChallenge.save();
     return res.status(201).json(savedChallenge);
    } catch (err) {
      return res.status(500).json(err);
    }
}
});

// Get Challenge
router.get("/", verify, async (req, res) => {
    if (req.body.userId === req.params.id || req.user.isAdmin ) {
      try {
        const challenge = await Challenge.find();
        res.status(200).json(challenge.reverse());
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You are not allowed!");
    }
  });

  //GET RANDOM

  router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let challenge;
    try {
      if (type === "challenge") {
        challenge = await Challenge.aggregate([
          { $sample: { size: 1 } },
        ]);
      } 
      res.status(200).json(challenge);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  //GET

router.get("/find/:id", verify, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    res.status(200).json(challenge);
  } catch (err) {
    return res.status(500).json(err);
  }
});


  //UPDATE

router.put("/:id", verify, async (req, res) => {
    try {
      const updatedChallenge = await Challenge.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedChallenge);
    } catch (err) {
      return res.status(500).json(err);
    }
  
});

//DELETE

router.delete("/:id", async (req, res) => {
  
    try {
      const challenge = await Challenge.findByIdAndDelete(req.params.id);
      if(req.user.isAdmin){
        await challenges.deleteOne();
       return res.status(200).json("Post deleted");
        
      }else{
        return res.status(403).json("you can delete only your post");
      }
    } catch(err) {
     return res.status(500).json(err);
    }
});

module.exports = router;