const mongoose = require('mongoose');

const Message = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Message: String,
    Username: String,
    HashedPassword: String,
    LastRoomID: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Messaage', Message);