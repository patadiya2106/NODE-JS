const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017";

mongoose.connect(URI);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database is connected...!!!!!");
});
db.on("error", (err) => {
  console.log("Error : ", err);
});
db.on("disconnected", () => {
  console.log("Database is disconnected....!!!!!");
});

module.exports = db;