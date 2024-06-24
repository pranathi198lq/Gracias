const router= require("express").Router();
const Post= require("../models/Post");
const User= require("../models/User");

//create a post
router.post("/", async(req, res)=>{
    const newPost= new Post(req.body);
    try{
        const savedPost= await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        return res.status(500).json(err);
    }
})

//update a post
router.put("/:id", async(req, res)=>{
    try{
    const post= await Post.findById(req.params.id);
    if(post.userId===req.body.userId){
        await post.updateOne({$set: req.body});
        res.status(200).json("Post has been updated!");
    }else{
        return res.status(403).json("You can only update your post");
    }
    }catch(err){
        return res.status(500).json(err); //add another error for post not found by id as 403
    }
});

//delete a post:
router.delete("/:id", async(req, res)=>{
    try{
    const post= await Post.findById(req.params.id);
    if(post.userId===req.body.userId){
        await post.deleteOne();
        res.status(200).json("Post has been deleted!");
    }else{
        return res.status(403).json("You can only delete your post");
    }
    }catch(err){
        return res.status(500).json(err); //add another error for post not found by id as 403
    }
});

//like or dislike a post:
router.put("/:id/like", async(req, res)=>{
    try{
        const post= await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("Post has been liked!");
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("Post has been disliked!");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//get a post:
router.get("/:id", async(req, res)=>{
    try{
        const post= await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        return res.status(500).json(err);
    }
});

//get a timeline:
router.get("/timeline/all", async(req, res)=>{
    //use promise instead of await as there are multiple
    try{
        const currUser= await User.findById(req.body.userId);
        //add all posts of curr user to the timeline
        const userPosts= await Post.find({userId: currUser._id});
        //have to use map so have to use promise to find all; we cannot find everything using await
        const friendPosts= await Promise.all(
            currUser.followings.map((friendId)=>{
               return Post.find({userId: friendId});
            })
        );
        res.json(userPosts.concat(...friendPosts));
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports=router;
