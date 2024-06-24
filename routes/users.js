
const router= require("express").Router();
const User= require("../models/User");
const bcrypt= require("bcrypt");

//update user:
router.put("/:id", async(req, res)=>{
    if(req.body.userId=== req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt= await bcrypt.genSalt(10);
                req.body.password= await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            const user= await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }); //can also give req.body.userId instead
            res.status(200).json("Account has been updated successfully!");
        }catch(err){
            return res.status(500).json(err);
        }
    } 
    else{
        return res.status(403).json("You can only update your account!");
    }
});

//delete user:
router.delete("/:id", async(req, res)=>{
    if(req.body.userId=== req.params.id || req.body.isAdmin){
        try{
            const user= await User.findByIdAndDelete(req.params.id); //can also use deleteOne({_id: req.params.id})
            res.status(200).json("Account has been deleted successfully!");
        }catch(err){
            return res.status(500).json(err);
        }
    } 
    else{
        return res.status(403).json("You can only delete your account!");
    }
});

//get a user:
router.get("/:id", async(req, res)=>{
    try{
        const user= await User.findById(req.params.id); //use this u will get all the user properties in postman if we use req.body.userId instead we get null upon success
        const {password, updatedAt, ...other}= user._doc; 
        res.status(200).json(other); // it will not display password, updateAt and will display rest all
    }catch(err){
        return res.status(500).json(err);
    }
});

//follow a user:
router.put("/:id/follow", async(req, res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user= await User.findById(req.params.id);
            const currUser= await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId}});
                await currUser.updateOne({$push: {followings: req.params.id}});
                res.status(200).json("You are following the user now!");
            }else{//if the user we want to follow already has the currUser in its followers then go to else
                return res.status(403).json("You are already following this user!");
            }
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot follow your own account!");
    }
});

//unfollow user:
router.put("/:id/unfollow", async(req, res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user= await User.findById(req.params.id);
            const currUser= await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currUser.updateOne({$pull: {followings: req.params.id}});
                res.status(200).json("You unfollowed the user now!");
            }else{//if the user we want to follow already has the currUser in its followers then go to else
                return res.status(403).json("You are already not following this user!");
            }
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cannot follow your own account!");
    }
});

module.exports= router
