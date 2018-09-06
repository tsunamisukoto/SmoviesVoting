const Room = require('../models/room.model.js');
const crytpo = require("crypto");
// Create and Save a new Room
const sha256 = (data) => {
    return crypto.createHash("sha256").update(data).digest("base64");
}
exports.mapRoom = (room) => {
    return {
        Name: room.Name,
        HashedPassword: sha256(room.Password)
    };
}
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Name) {
        return res.status(400).send({
            room: "Room Name can not be empty"
        });
    }

    // Create a Room
    const room = new Room(exports.mapRoom(req.body));

    // Save Room in the database
    room.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            room: err.room || "Some error occurred while creating the Room."
        });
    });
};

// Retrieve and return all rooms from the database.
exports.findAll = (req, res) => {

    Room.find(req.params.category ? { Category: req.params.category } : null)
    .then(rooms => {
        res.send(rooms);
    }).catch(err => {

        res.status(500).send({
            room: err.room || "Some error occurred while retrieving rooms."
        });
    });
};

// Find a single room with a roomId
exports.findOne = (req, res) => {
    Room.findById(req.params.roomId)
  .then(room => {
      if (!room) {
          return res.status(404).send({
              room: "Room not found with id " + req.params.roomId
          });
      }
      res.send(room);
  }).catch(err => {
      if (err.kind === 'ObjectId') {
          return res.status(404).send({
              room: "Room not found with id " + req.params.roomId
          });
      }
      return res.status(500).send({
          room: "Error retrieving room with id " + req.params.roomId
      });
  });
};

// Update a room identified by the roomId in the request
exports.update = (req, res) => {
    // Find room and update it with the request body
    Room.findByIdAndUpdate(req.params.roomId, exports.mapRoom(req.body), { new: true })
    .then(room => {
        if (!room) {
            return res.status(404).send({
                room: "Room not found with id " + req.params.roomId
            });
        }
        res.send(room);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                room: "Room not found with id " + req.params.roomId
            });
        }
        return res.status(500).send({
            room: "Error updating room with id " + req.params.roomId
        });
    });
};

// Delete a room with the specified roomId in the request
exports.delete = (req, res) => {
    Room.findByIdAndRemove(req.params.roomId)
    .then(room => {
        if (!room) {
            return res.status(404).send({
                room: "Room not found with id " + req.params.roomId
            });
        }
        res.send({ room: "Room deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                room: "Room not found with id " + req.params.roomId
            });
        }
        return res.status(500).send({
            room: "Could not delete room with id " + req.params.roomId
        });
    });
};