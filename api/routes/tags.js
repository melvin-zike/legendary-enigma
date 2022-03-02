const router = require('express').Router();
const Tag = require('../models/Tag');
const Movie = require('../models/Movie');
const verify = require("../verifyToken");


//GET ALL
router.get("/search", verify, async (req, res) => {
    const query = req.query.name;
    if(req.body.id === req.params.id || req.user.isAdmin ){
        try{
            const tags = query ? await Tag.find().sort({_id:-1}).limit(10) : await User.find();
            res.status(200).json(tags);  
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json('You are not allowed to see all Users!')
    }
})


//Save to Db
router.post("/", async (req, res) => {
    if(req.body.id === req.params.id || req.user.isAdmin ){
    const newTag = new Tag(req.body);
    try {
      const savedTag = await newTag.save();
      res.status(201).json(savedTag);
    } catch (err) {
      res.status(500).json(err);
    }
}else{
    res.status(403).json('You are not allowed!')
}
});

//follow a Tag
router.put('/:id/tag', async (req, res ) => {
    try{
        const tag = await Tag.findById(req.params.id);
        if(!tag.content.includes(req.body.movies._id)){
            await tag.updateOne({$push: { content: req.body.movies }});
            res.status(200).json("User has been followed");
        }else{
            res.status(403).json("you already followed this user")
        }
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;
