const mongoose = require("mongoose");

mongoose.connect(process.env.URI).then((data) => {
    console.log("Database is connected..");
    
}).catch((err) => {
    console.log("Error : " ,err);
    
})