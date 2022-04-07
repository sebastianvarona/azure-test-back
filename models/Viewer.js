const mongoose = require('mongoose');

const ViewerSchema = new mongoose.Schema({
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
});

const Viewer = mongoose.model('Viewer', ViewerSchema);

module.exports = Viewer;