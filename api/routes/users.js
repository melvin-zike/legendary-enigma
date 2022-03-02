const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const verify = require("../verifyToken")

//UPDATE
router.put("/:id", verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password =CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true})
            res.status(200).json(updatedUser)
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json('You can update only your account!')
    }
});

//UPDATE Profile pic
router.put("/:id/update", verify, async (req, res) => {
    const newProfilePic = req.body.newProfilePic;
    const id = req.body.id;
    if((id === req.params.id) || req.user.isAdmin){   
        try{
            await User.findById(id, (error, updatedUser) =>  {
                updatedUser.profilePic = newProfilePic;
                updatedUser.save();
                return res.status(200).json(updatedUser);
            })
                }catch(err){
            return res.status(500).json(err);
        }
    }else{
       return res.status(403).json('You can update only your account!')
    }
});
//UPDATE account number
router.put("/:id/update-account", verify, async (req, res) => {
    const accountNumber = req.body.accountNumber;
    const id = req.body.id;
    if((id === req.params.id) || req.user.isAdmin){   
        try{
            await User.findById(id, (error, updatedUser) =>  {
                updatedUser.accountNumber = accountNumber;
                updatedUser.save();
                return res.status(200).json(updatedUser);
            })
                }catch(err){
            return res.status(500).json(err);
        }
    }else{
       return res.status(403).json('You can update only your account!')
    }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
    if(req.body.id === req.params.id || req.user.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json(" User has been deleted...");
            
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json('You can delete only your account!')
    }
})

//GET
router.get("/find/:id", async (req, res) => {
        try{
         const user = await User.findById(req.params.id);
            const {password, ...info } = user._doc;
           return res.status(200).json(info);
            
        }catch(err){
           return res.status(500).json(err);
        }
})

//get a user
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
try{
    const user = userId ? await User.findById(userId) : await User.findOne({ username: username });
    const {password, updatedAt, ...other} = user._doc
   return res.status(200).json(other)
}catch(err){
    return res.status(500).json(err);
}
})

//GET ALL
router.get("/all", async (req, res) => {
    const query = req.query.new;
    if(req.body.userId === req.params.id || req.user.isAdmin){
        try{
            const users = query ? await User.find().sort({_id:-1}).limit(3) : await User.find();
           return res.status(200).json(users);  
        }catch(err){
           return res.status(500).json(err);
        }
    }else{
        return res.status(403).json('You are not allowed to see all Users!')
    }
})

//RANDOM USERS
router.get("/random-users", verify, async (req, res) => {
    let user;
    try {
        user = await User.aggregate([
          { $sample: { size: 50 } },
        ])
        return res.status(200).json(user);  
    } catch (err) {
       res.status(500).json(err);
    }
  });

// /GET FRIENDS
//get Friends
router.get('/friends/:userId',  async(req, res) => {
    try{
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
        user.followings.map((friendId) => {
            return User.findById(friendId)
        })
    )
    let friendList = [];
    friends.map((friend) =>{
        const { _id, username, profilePicture} = friend;
        friendList.push({ _id, username, profilePicture })
    })
    res.status(200).json(friendList);
    }catch(err){
        return res.status(500).json(err);
    }
})

//follow a user
router.put('/:id/follow', async (req, res ) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: { followers: req.body.userId }});
                await currentUser.updateOne({$push: { followings: req.params.id }});
                res.status(200).json("User has been followed");
            }else{
                res.status(403).json("you already followed this user")
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        return res.status(403).json("you cant follow yourself")
    }
})
//unfollow a user
router.put('/:id/unfollow',  async (req, res ) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: { followers: req.body.userId }});
                await currentUser.updateOne({$pull: { followings: req.params.id }});
                res.status(200).json("User has been unfollowed");
            }else{
                res.status(403).json("you dont follow this user")
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        return res.status(403).json("you cant unfollow yourself")
    }
})

//like a User
router.put("/:id/like", verify, async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
       if(!user.likes.includes(req.body.userId)){
         await user.updateOne({$push: { likes: req.body.userId }});
        return res.status(200).json("User has been liked")
      }
      else{
         await user.updateOne({$pull: { likes: req.body.userId }})
        return res.status(200).json("User has been unliked");
    }
    }catch(err){
        res.send(500).json(err); 
    }
    
  })

  //users donations
router.put('/:id/donation', verify, async (req, res ) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
               await user.updateOne({$inc: {donation: req.body.amount}});
               return res.status(200).json("Thanks for donating!");
      
        }catch(err){
          return res.status(500).json(err)
        }
    }else{
        return res.status(403).json("you cannot donate to yourself")
    }
  })
  
  //users donations approval withdraw balance
router.put('/:id/approve', verify, async (req, res ) => {
    if(req.user.isAdmin){
        try{
            const user = await User.findById(req.params.id);
               await user.updateOne({$inc: {donation: -req.body.amount}});
               return res.status(200).json("Thanks for donating!");
      
        }catch(err){
          return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("you cannot donate to yourself")
    }
  })
  


//GET USER STATS
router.get("/stats", async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    try{
        const data = await User.aggregate([
            {
                $project:{
                    month: {$month: "$createdAt"}
                }
            },{
                $group:{
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ])
        res.status(200).json(data);
    }catch(err){
      res.status(500).json(err)
    }
})



module.exports = router;