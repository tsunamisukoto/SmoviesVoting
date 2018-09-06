module.exports = (app) => {
    const messages = require("./controllers/dog.controller.js");
    //const authenticated = require('../modules/Authenticated.js');

    app.get("/message/:roomId", messages.findAll);
    //app.post("/message/:roomId", authenticated.authenticationRequired(messages.create));
    app.post("/message/:roomId", (messages.create));

    //app.delete("/message/:messageId", authenticated.authenticationRequired(messages.delete));
    app.delete("/message/:messageId", (messages.delete));
}