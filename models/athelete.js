const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ATheleteSchema=new Schema({
    name:String,
    age:Number
})

module.exports=mongoose.model("Athelete",ATheleteSchema);