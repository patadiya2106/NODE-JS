const express = require('express');

const db = require("./config/dataBase");

const app = express();
const PORT = 8888;

// app.use(express.urlencoded({extended:true}));

// app.use("/",require("./routes/index"))

app.get("/users" , (req ,res) => {
    // res.json({message : "Get requset called....."});
    res.status(200).json({message : "I am Rahul Patadiya"});
});

app.listen(PORT , (err) => {
    if(err){
        console.log("ERROR" , err); 
        return false;
    }
        
    console.log("Server is Started On Port number 8888.....!!!!");
});