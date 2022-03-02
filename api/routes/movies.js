const router = require("express").Router();
const Movie = require("../models/Movie");
const User = require('../models/User');
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {

    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
     return res.status(201).json(savedMovie);
    } catch (err) {
      return res.status(500).json(err);
    }
  
});

router.get("/timeline/:userId", verify, async (req, res) => {
  try{
      const currentUser = await User.findById(req.params.userId);
      const userMovies = await Movie.find({ userId: currentUser._id })
      const friendMovie = await Promise.all(
          currentUser.followings.map((friendId) => {
              return Movie.find({ userId: friendId });
          }));
         return res.status(200).json(userMovies.concat(...friendMovie));
  }catch(err){
      return res.status(500).json(err);
  }
})

//UPDATE

router.put("/:id", verify, async (req, res) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      return res.status(500).json(err);
    }
  
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if((movie.userId === req.body.userId) || req.user.isAdmin){
        await movie.deleteOne();
    res.status(200).json("Post deleted");
        
      }else{
        return res.status(403).json("you can delete only your post");
      }
    } catch(err) {
     return res.status(500).json(err);
    }
});

//GET
router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json(err);
  }
});


//Vote a movie
router.put('/:id/votes', verify, async (req, res ) => {
  if(req.body.userId !== req.params.id){
      try{
          const movie = await Movie.findById(req.body.postId);
          if(!movie.votes.includes(req.body.userId)){
              await movie.updateOne({$push: { votes: req.body.userId }});
             return res.status(200).json("Thanks for voting!");
          }else{
             return res.status(403).json("you already voted For this video")
          }
      }catch(err){
         return res.status(500).json(err)
      }
  }else{
      return res.status(403).json("you cant vote twice")
  }
})
//credit a movie
router.put('/:id/credit', verify, async (req, res ) => {
  if(req.body.userId !== req.params.id){
      try{
          const movie = await Movie.findById(req.body.postId);
             await movie.updateOne({$inc: {credit: req.body.amount}});
             return res.status(200).json("Thanks for voting!");
    
      }catch(err){
        return res.status(500).json(err)
      }
  }else{
      return res.status(403).json("you cannot vote for yourself")
  }
})

//like a post
router.put("/:id/like", verify, async(req, res) => {
  try{
      const movie = await Movie.findById(req.params.id);
     if(!movie.likes.includes(req.body.userId)){
       await movie.updateOne({$push: { likes: req.body.userId }});
      return res.status(200).json("The post has been liked")
    }
    else{
       await movie.updateOne({$pull: { likes: req.body.userId }})
      return res.status(200).json("The post has been disliked");
  }
  }catch(err){
      return res.send(500).json(err); 
  }
  
})
//comment a post
router.put("/:id/comments", verify, async(req, res) => {
  try{
      const movie = await Movie.findById(req.params.id);
     if(!movie.comments.includes(req.body.userId) || movie.comments.includes(req.body.userId)){
      await movie.updateOne({$push: { comments: req.body }});
       return res.status(200).json("comment succesfull");
    }
  }catch(err){
      return res.send(500).json(err);
  }
  
})

//GET RANDOM

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL

router.get("/", verify, async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin ) {
    try {
      const movies = await Movie.find().limit(100);
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//get all a users post
router.get("/profile/:username", verify, async (req, res) => {
  try{
      const user = await User.findOne({username:req.params.username})
      const movies = await Movie.find({userId:user._id})
      res.status(200).json(movies)
  }catch(err){
      res.status(500).json(err)
  }
})

module.exports = router;