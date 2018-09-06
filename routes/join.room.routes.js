module.exports = (app) => {
    const joinRooms = require("./controllers/joinRoom.controller.js");

    app.get("/joinRooms", (joinRooms.create));

}