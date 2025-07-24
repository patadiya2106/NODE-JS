const express = require("express");

require("dotenv").config();

require("./config/db");

const app =express();

app.use(express.json());

app.use("/api/auth" , require("./routes/auth.route"));
app.use("/api/inventory" , require("./routes/inventory.route"));
app.use("/api/stockflow" , require("./routes/stockflow.route"));
app.use("/api/invmanage" , require("./routes/invmanage.route"));
app.use("/api/smartinvetory" , require("./routes/smartinvetory.route"));

app.listen(process.env.PORT , (error) => {
    if(error){
        console.log(error);
        return false;  
    }
      console.log("Server is started......" , process.env.PORT);
}); 