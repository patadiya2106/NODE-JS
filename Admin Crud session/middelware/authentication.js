const Passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/adminModel');

// Configure Local Strategy
Passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const adminData = await Admin.findOne({ email });
        if (!adminData) {
            return done(null, false, { message: 'No user with that email' });
        }
        if (adminData.password !== password) { // In production, use hashed passwords
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, adminData);
    } catch (err) {
        return done(err);
    }
}));

// Serialize user
Passport.serializeUser((admin, done) => {
    done(null, admin.id);
});

// Deserialize user
Passport.deserializeUser(async (id, done) => {
    try {
        const admin = await Admin.findById(id);
        done(null, admin ? admin : false);
    } catch (err) {
        done(err);
    }
});

// Middleware to check authentication
Passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
};

// Middleware to prevent access if already logged in
Passport.checkLostPasswordAuthentication = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    return next();
};

// Middleware to set current user in views
Passport.currentAdmin = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        res.locals.currentAdmin = req.user;
    }
    return next();
};

module.exports = Passport;
