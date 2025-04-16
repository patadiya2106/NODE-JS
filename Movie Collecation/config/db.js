const mongoose = require('mongoose');

const URL = ('mongodb://localhost:27017/movie');

const db=mongoose.connection;

mongoose.connect(URL);

db.on('connected', () => console.log('DB is Connected..'));

db.on('error', (err) => console.log('DB is  not Connected..', err));

db.on('disconnected', () => console.log('DB is Disconnected..'));

module.exports = db;
