const mongoose=require("mongoose");
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    number:{type:Number,required:true}
},{
    versionKey:false,
    timestamps:true
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) 
    return next();
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
  });

  userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  const User=mongoose.model("user",userSchema);

  const teacherSchema=new mongoose.Schema({
   name:{type:String,required:true},
   gender:{type:String,required:true},
   age:{type:Number,required:true}
  },{
    versionKey:false,
    timestamps:true
  })
  
 const Teacher=mongoose.model("teacher",teacherSchema)
  
const classesSchema=new mongoose.Schema({
  grade:{type:String,required:true},
  section:{type:String,required:true},
  subject:[{type:String,required:true}],
  teacher_id:{type:mongoose.Schema.Types.ObjectId,ref:"teacher"}
},{
  versionKey:false,
  timestamps:true
}) 

const Class=mongoose.model("class",classesSchema);

module.exports={User,Teacher,Class}
