const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    release: {
        type: String,
        required: true
    },
    director:
    {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    }
});

// ✅ Correct Export
module.exports = mongoose.model('Movie', movieSchema);
