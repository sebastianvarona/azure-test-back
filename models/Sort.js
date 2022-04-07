const mongoose = require('mongoose');

const SortSchema = new mongoose.Schema({
    streamerId: {
        type: String,
        required: true
    },
    nombreSorteo: {
        type: String,
        required: true
    },
    date: {
        type: String,
        unique: true,
        required: true
    },
    premio: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    participants: {
        type: Array,
        default: [],
    }
});

const Sorteo = mongoose.model('Sorteo', SortSchema);

module.exports = Sorteo;