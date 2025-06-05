const express = require('express')
const dataBase =require('./config/dataBase');
const cookieParser =require('cookie-parser');
const passport = require('passport');
const passportLocal =require('passport-local').Strategy;
const app =express();
const path = require('path')
const port = 8000;

app.set("view engine" , "ejs");
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());


app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/admin'));
app.listen(port,()=>{console.log("server is started...")})  
