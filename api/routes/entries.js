const router= require("express").Router();
const Entry= require("../models/Entry");
const User= require("../models/User");

//create an entry:
router.post("/", async(req, res)=>{
    const newEntry= new Entry(req.body);
    try{
        const savedEntry= await newEntry.save();
        res.status(200).json(savedEntry);
    }catch(err){
        return res.status(500).json(err);
    }
});

//get an entry by the entryid:
router.get("/:id", async(req, res)=>{
    try{
        const entry= await Entry.findById(req.params.id);
        res.status(200).json(entry);
    }catch(err){
        return res.status(500).json(err);
    }
});


//get all the user's entries:
router.get("/dear/:username", async (req, res)=>{
    try{
        const user= await User.findOne({username:req.params.username})
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const entries= await Entry.find({userId: user._id});
         res.status(200).json(entries);
    }catch(err){
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports=router;
