const express = require('express');
const multer = require('multer');
const controllers = require('../controllers/movieController');

const route = express.Router();

// File storage config for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});

const upload = multer({ storage });

// Routes
route.get('/', controllers.getAllMovies);

route.get('/addMovie', controllers.showAddForm);

route.post('/insert', upload.single('avatar'), controllers.createMovie);

route.get('/update/:id', controllers.showEditForm);

route.post('/edit/:id', upload.single('avatar'), controllers.updateMovie);

route.get('/delete/:id', controllers.deleteMovie);

route.get('/indetails/:id', controllers.showMovieDetails);

route.get('/CardInDetails', controllers.showCardDetails);

module.exports = route;
