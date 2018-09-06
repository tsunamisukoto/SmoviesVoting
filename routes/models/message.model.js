const mongoose = require('mongoose');

const Message = mongoose.Schema({
    Message: String,
    Username: String,
    RoomID: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Messaage', Message);