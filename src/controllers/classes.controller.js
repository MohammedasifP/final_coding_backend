const express=require('express')
const router=express.Router();
const {Class}=require("../models/user.model.js")


router.post("",async(req,res)=>{
    try {
        const classs=await Class.create(req.body)
        return res.status(201).send(classs)
    } catch (error) {
        return res.status(500).send(error.message);
    }
})
router.get("",async(req,res)=>{
    try {
        const teachers=await Class.find().populate("teacher_id").lean().exec();;
        return res.status(201).send(teachers)
    } catch (error) {
        res.status(500).send(error.message);
    }
})


module.exports=router;