const mongoose =require("mongoose");

const authSchema = new mongoose.Schema({
    fname :String,
    lname:String,
    email:{
        type:String,
        unique:true,
    },
    password:String,
    phone:String,
    hobby:Array,
},{
    timestamps:true,
});
 
module.exports = mongoose.model("Auth" , authSchema ,"Auth")