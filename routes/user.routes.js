module.exports = (app) => {
    const users = require("./controllers/user.controller.js");

    app.get("/users/:category?", users.findAll);
    app.post("/users", (users.create));

    app.get("/users/:userId", users.findOne);
    app.put("/users/:userId", (users.update));
    app.delete("/users/:userId", (users.delete));
}