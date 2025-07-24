const express = require("express");

const dataBase = require("./config/dataBase");

const app =express();

const PORT = 8282;

app.listen(PORT , (err) => {
    if(err){
        console.log("ERROR : ", err)
        return false;
    }
    console.log("Server is Started.......");
});