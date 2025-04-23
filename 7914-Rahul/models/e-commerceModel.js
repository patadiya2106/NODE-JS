const mongoose = require("mongoose");

const commerceSchema= new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    descripcation:{
        type:String,
        require:true
    },
    avtar:{
        type:String,
        require:true
    },
     color:{
        type:Number,
        require:true
    },
    category:{
        type:Number,
        require:true
    },
    location:{
        type:String,
        require:true
    }

})

module.exports = mongoose.model('commerce' , commerceSchema);