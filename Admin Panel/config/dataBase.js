const mongoose =require('mongoose')
const URL =("mongodb://localhost:27017");
const dataBase = mongoose.connection;
mongoose.connect(URL);

dataBase.on('connected' , () => console.log('Database is connected successfully.....'));
dataBase.on('error' , () => console.log('Database is Notconnected please try again.....'));
dataBase.on('disconnected' , () => console.log('Database disconnected.....'));

module.exports = dataBase;