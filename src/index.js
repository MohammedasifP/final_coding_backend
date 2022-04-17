
require("dotenv").config();
const express=require('express');
const mongoose=require("mongoose");
const app=express();
      app.use(express.json())
const teachercontroller=require('./controllers/Teacher.controller')      
const classcontroller=require('./controllers/classes.controller')
const connect=()=>{
    mongoose.connect("mongodb+srv://asif:asif_456@cluster0.ep2by.mongodb.net/outh?retryWrites=true&w=majority");
}

const {register,login}=require('./controllers/auth.controller');

app.post("/register",register)
app.post("/login",login);

app.use("/teacher",teachercontroller);
app.use("/class",classcontroller)



app.listen(process.env.PORT || 5500, async function () {
    try {
      await connect();
      console.log("app is listening on port 5500");
    } catch (err) {
      console.log(err.message);
    }
  });
