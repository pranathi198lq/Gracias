const router= require("express").Router();
const Message= require("../models/Message");

//send a message:
router.post("/", async(req, res)=>{
    const newMes= new Message(req.body);

    try{
        const savedMes= await newMes.save();
        res.status(200).json(savedMes)
    }catch(err){
        res.status(500).json(err);
    }
})

//get a message:
router.get("/:conversationId", async(req, res)=>{
    try{
        const mes= await Message.find({
            conversationId: req.params.conversationId,
        });
        return res.status(200).json(mes);
    }catch(err){
        return res.status(500).json(err);
    }
})


module.exports= router;
