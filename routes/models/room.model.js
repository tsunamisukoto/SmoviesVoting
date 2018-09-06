const mongoose = require('mongoose');

const Room = mongoose.Schema({
    Name: String,
    HashedPassword: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', Room);