const router= require("express").Router();
const Conversation= require("../models/Conversation");

//new conversation:
router.post("/", async(req, res)=>{
    const newConv= new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });
    try{
        const savedConv= await newConv.save();
        return res.status(200).json(savedConv);
    }catch(err){
        return res.status(500).json(err);
    }
});

//get conversation:
router.get("/:userId", async(req, res)=>{
    try{
        const conv= await Conversation.find({
            members: {$in: [req.params.userId]}
        });
        return res.status(200).json(conv);
    }catch(err){
        return res.status(500).json(err);
    }
})


module.exports= router;
