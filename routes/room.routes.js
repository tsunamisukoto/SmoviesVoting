module.exports = (app) => {
    const rooms = require("./controllers/room.controller.js");

    app.get("/rooms/:category?", rooms.findAll);
    app.post("/rooms", (rooms.create));

    app.get("/rooms/:roomId", rooms.findOne);
    app.put("/rooms/:roomId", (rooms.update));
    app.delete("/rooms/:roomId", (rooms.delete));
}