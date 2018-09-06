const User = require('../models/user.model.js');
const crypto = require('crypto');
const sha256 = (data) => {
    return crypto.createHash("sha256").update(data).digest("base64");
}
// Create and Save a new User
exports.mapUser = (user) => {
    return {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Message: user.Message,
        Username: user.Username,
        HashedPassword: sha256(user.Password),
        LastRoomID: user.LastRoomID
    };
}
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Username) {
        return res.status(400).send({
            message: "Username can not be empty"
        });
    }
    if (!req.body.Password) {
        return res.status(400).send({
            message: "Password can not be empty"
        });
    }
    if (!req.body.FirstName) {
        return res.status(400).send({
            message: "First name can not be empty"
        });
    }
    if (!req.body.LastName) {
        return res.status(400).send({
            message: "Last name can not be empty"
        });
    }

    User.findOne({ Username: req.body.Username }).then(user => {
        if(user)
        {
            return res.status(400).send({
                message: "Username already in system"
            });
        }
        else
        {
            const user = new User(exports.mapUser(req.body));

            // Save User in the database
            user.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                });
            });

        }
    });
    // Create a User
  
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {

    User.find(req.params.category ? { Category: req.params.category } : null)
    .then(users => {
        res.send(users);
    }).catch(err => {

        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
  .then(user => {
      if (!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params.userId
          });
      }
      res.send(user);
  }).catch(err => {
      if (err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "User not found with id " + req.params.userId
          });
      }
      return res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId
      });
  });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, exports.mapUser(req.body), { new: true })
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({ message: "User deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};