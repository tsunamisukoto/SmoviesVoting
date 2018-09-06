const Message = require('../models/message.model.js');
// Create and Save a new Message
exports.mapMessage = (message)=>{
    return {
        Name: message.Name,
        Category: message.Category,
        Nickname: message.Nickname,
        Grading: message.Grading,
        Achievements: message.Achievements,
        Sire: message.Sire,
        Dame: message.Dame
    };
}
exports.create = (req, res) => {
    // Validate request
    if (!req.body.Name) {
        return res.status(400).send({
            message: "Message Name can not be empty"
        });
    }

    // Create a Message
    const message = new Message(exports.mapMessage(req.body));

    // Save Message in the database
    message.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Message."
        });
    });
};

// Retrieve and return all messages from the database.
exports.findAll = (req, res) => {

    Message.find(req.params.category? { Category: req.params.category }: null)
    .then(messages => {
        res.send(messages);
    }).catch(err => {

        res.status(500).send({
            message: err.message || "Some error occurred while retrieving messages."
        });
    });
};

// Find a single message with a messageId
exports.findOne = (req, res) => {
    Message.findById(req.params.messageId)
  .then(message => {
      if (!message) {
          return res.status(404).send({
              message: "Message not found with id " + req.params.messageId
          });
      }
      res.send(message);
  }).catch(err => {
      if (err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Message not found with id " + req.params.messageId
          });
      }
      return res.status(500).send({
          message: "Error retrieving message with id " + req.params.messageId
      });
  });
};

// Update a message identified by the messageId in the request
exports.update = (req, res) => {
    // Find message and update it with the request body
    Message.findByIdAndUpdate(req.params.messageId, exports.mapMessage(req.body), { new: true })
    .then(message => {
        if (!message) {
            return res.status(404).send({
                message: "Message not found with id " + req.params.messageId
            });
        }
        res.send(message);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Message not found with id " + req.params.messageId
            });
        }
        return res.status(500).send({
            message: "Error updating message with id " + req.params.messageId
        });
    });
};

// Delete a message with the specified messageId in the request
exports.delete = (req, res) => {
    Message.findByIdAndRemove(req.params.messageId)
    .then(message => {
        if (!message) {
            return res.status(404).send({
                message: "Message not found with id " + req.params.messageId
            });
        }
        res.send({ message: "Message deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Message not found with id " + req.params.messageId
            });
        }
        return res.status(500).send({
            message: "Could not delete message with id " + req.params.messageId
        });
    });
};