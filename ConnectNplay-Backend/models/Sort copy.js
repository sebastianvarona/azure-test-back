const mongoose = require('mongoose');

const TorneoSchema = new mongoose.Schema({
    streamerId: {
        type: String,
        required: true
    },
    nombreTorneo: {
        type: String,
        unique: true,
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

const Torneo = mongoose.model('Torneo', TorneoSchema);

module.exports = Torneo;