const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/e-commerce";

mongoose.connect(URI);

const db = mongoose.connection;

db.on('connected', () => console.log('Databse is connected....'));
db.on('error', () => console.log('error please try again....'));
db.on('disconnected', () => console.log('Databse is connected....'));

module.exports = db;

