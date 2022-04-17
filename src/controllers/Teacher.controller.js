const {Teacher}=require("../models/user.model.js")
const express=require("express");
const router=express.Router();

router.post("",async(req,res)=>{
    try {
        const teacher=await Teacher.create(req.body);
        return res.status(201).send(teacher);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get("",async(req,res)=>{
    try {
        const page=req.query.page || 1;
        const size=req.query.size || 4;
        const operation=req.query.task;
        const order=req.query.order;
        if(operation=="female"){
            const teachers=await Teacher.find({gender:"female"}).lean().exec();
           return res.send({teachers});
        }
        else if(operation=="male"){
            const teachers=await Teacher.find({gender:"male"}).lean().exec();
           return res.send({teachers});

        }
        else if(order=='asc'){
            const teachers=await Teacher.find().sort({age:1}).lean().exec();
           return res.send({teachers});
        }
        else if(order=='desc'){
            const teachers=await Teacher.find().sort({age:-1}).lean().exec();
           return res.send({teachers});
        }
        const teachers=await Teacher.find().skip((page-1)*size).limit(size).lean().exec();
         const totalpages=Math.ceil((await Teacher.find().countDocuments())/size)
        return res.send({teachers,totalpages,operation});

    } catch (error) {
        res.status(500).send(error.message);
    }
})





module.exports=router;
