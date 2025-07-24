const mongoose = require('mongoose');

const URI ="mongodb://localhost:27017";

mongoose.connect(URI);

const db = mongoose.connection;

db.on("connected" , () => {
    console.log("DB is connected.......");
});
db.on("disconnected" , () => {
    console.log("DB is disconnected.......");
});
db.on("error" , () => {
    console.log("DB is not connected......." , err);
});



module.exports = db;