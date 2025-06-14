const express = require('express');
const db = require('./config/db');
const cookieParser = require('cookie-parser');
const Passport = require("passport");
const flash = require('connect-flash');
const app = express();
const path = require('path');
const passport = require('./middelware/authentication');
const session = require('express-session');
const port = 8000;

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());

app.use(session({
    secret: 'AdminPanel',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.currentAdmin);

app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/admin'));


app.listen(port, () => { console.log("server is started...") });
