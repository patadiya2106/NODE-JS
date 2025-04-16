const movie = require('../models/movieModel');
const fs = require('fs');

// homepage 
const getAllMovies = async (req, res) => {
    const records = await movie.find();
    res.render("index", { records });
};

// form page
const showAddForm = (req, res) => {
    res.render("form");
};

// Add movie
const createMovie = async (req, res) => {
    try {
        if (req.file) req.body.avatar = req.file.path;
        await movie.create(req.body);
        res.redirect('/');
    } catch (error) {
        console.error("Create Error:", error);
        res.status(500).send("Failed to insert movie.");
    }
};

// edit movie
const showEditForm = async (req, res) => {
    const records = await movie.findById(req.params.id);
    res.render('edit', { records });
};

// Update movie 
const updateMovie = async (req, res) => {
    try {
        const records = await movie.findById(req.params.id);

        if (req.file) {
            if (records.avatar && fs.existsSync(records.avatar)) {
                fs.unlinkSync(records.avatar);
            }
            req.body.avatar = req.file.path;
        } else {
            req.body.avatar = records.avatar;
        }

        await movie.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).send("Failed.");
    }
};

// Delete movie
const deleteMovie = async (req, res) => {
    try {
        const records = await movie.findById(req.params.id);
        if (records.avatar && fs.existsSync(records.avatar)) {
            fs.unlinkSync(records.avatar);
        }
        await movie.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).send("Failed to delete.");
    }
};

//  movie detail page
const showMovieDetails = async (req, res) => {
    try {
        const movieData = await movie.findById(req.params.id);
        if (!movieData) return res.status(404).send("Movie not found");
        res.render('indetails', { movie: movieData });
    } catch (error) {
        console.error("Details Error:", error);
        res.status(500).send("Error SLove.");
    }
};

const showCardDetails = (req, res) => {
    const season = req.query.season;

    const seasons = {
        1: {
            title: "Pokemon Season 1 - Indigo League",
            image: "/images/Pokemon Season-1.jpg",
            description: "Ash starts his journey with Pikachu in the Kanto region..."
        },
    };

    const data = seasons[season];

    if (data) res.render("CardInDetails", { season: data });
    else res.status(404).send("Season not found");
};

module.exports = {
    getAllMovies,
    showAddForm,
    createMovie,
    showEditForm,
    updateMovie,
    deleteMovie,
    showMovieDetails,
    showCardDetails
};
