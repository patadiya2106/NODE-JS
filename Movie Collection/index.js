const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./config/db');
const Movie = require('./models/movieModel'); 


const app = express();
const port = 8888;

app.set('view engine', 'ejs');
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File Upload Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
app.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();  
        res.render('index', { movies });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

app.get('/form/:id?', async (req, res) => {
    let movie = null;  // Default null

    if (req.params.id) {
        movie = await Movie.findById(req.params.id);  // Fetch movie data
    }

    res.render('form', { movie });
});


app.post('/add-movie', upload.single('poster'), async (req, res) => {
    const { name, release, director } = req.body;
    let genre = req.body.genre;

    if (!Array.isArray(genre)) {
        genre = [genre];  // Convert single selection into an array
    }

    const poster = req.file ? req.file.path : "";

    await Movie.create({ name, genre, release, director, poster });
    res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (movie && movie.poster) {
        fs.unlinkSync(movie.poster);
    }
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// Edit Movie Form 
app.get('/edit/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('form', { movie });
});

// Update Movie Logic
app.post('/update-movie/:id', upload.single('poster'), async (req, res) => {
    const { name, release, director } = req.body;
    let genre = req.body.genre;
    if (!Array.isArray(genre)) genre = [genre];

    const movie = await Movie.findById(req.params.id);

    if (req.file) {
        fs.unlinkSync(movie.poster); // Old poster delete
        movie.poster = req.file.path; // New poster update
    }

    movie.name = name;
    movie.genre = genre;
    movie.release = release;
    movie.director = director;

    await movie.save();
    res.redirect('/');
});



app.listen(port, () => console.log(`Server Started on http://localhost:${port}`));
