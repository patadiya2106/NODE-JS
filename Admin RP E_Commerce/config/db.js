const mongoose = require('mongoose');
const mongoUrl = ('mongodb://localhost:27017/admin-data');
const db = mongoose.connection;
mongoose.connect(mongoUrl);
db.on('connected', () => console.log('DB is Connected..'));
db.on('error', (err) => console.log('DB is  not Connected..', err));
db.on('disconnected', () => console.log('DB is Disconnected..'));
module.exports = db;
