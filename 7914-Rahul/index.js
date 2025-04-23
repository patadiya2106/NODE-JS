const express = require("express");
const mongoose = require('mongoose');
const db =require('./config/db');
const multer = require('multer');
const path = require('path');
const port = 8888;

const app = express();

app.set('view engine' , 'ejs');

app.use(express.urlencoded({extended : true}));

// app.use('/uploads', )
app.use('/' , require('./routes'));

app.listen(port , () => console.log(`server is started mongodb://localhost:27017 ${port}`));

