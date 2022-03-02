const router = require("express").Router();
const Conversation = require("../models/Conversation");
const verify = require("../verifyToken");

//new conv

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", verify, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//join conversation
router.put("/:id/convo", verify, async(req, res) => {
  try{
      const conversation = await Conversation.findById(req.params.id);
     if(!conversation.members.includes(req.body.userId)){
       await conversation.updateOne({$push: { members: req.body.userId }});
       res.status(200).json("You joined the chat")
    }
    else{
       res.status(200).json("You rejoined the chat");
  }
  }catch(err){
      res.send(500).json(err); 
  }
  
})

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", verify, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;