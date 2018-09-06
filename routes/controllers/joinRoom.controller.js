const Room = require('../models/room.model.js');
// Create and Save a new Room
exports.create = (req, res, next) => {
    // Validate request
    res.setHeader('Set-Cookie', req.body._id + '=' + req.body.Name);
    res.setHeader('Set-Cookie', req.body._id + '=' + req.body.Name);
    res.redirect('/room.html?roomId=' + req.body._id);
    next();
};
