const mongoose = require('mongoose');

const StreamerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    followers: {
        type: Array,
        default: []
    },
    sorts: {
        type: Array,
        default: []
    }
});

const Streamer = mongoose.model('Streamer', StreamerSchema);

module.exports = Streamer;