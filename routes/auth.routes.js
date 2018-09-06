
const crypto = require('crypto');

const sha256 = (data) => {
    return crypto.createHash("sha256").update(data).digest("base64");
}

const User = require('./models/user.model.js');
const authenticated = require('../modules/Authenticated.js');

module.exports = (app) => {

    const parseCookies = (request) => {
        var list = {},
            rc = request.headers.cookie;

        rc && rc.split(';').forEach(function (cookie) {
            var parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });

        return list;
    }
    app.post("/auth/", (req, res) => {
        var hashedPassword = sha256(req.body.Password);
        // Validate request
        var uname = req.body.Username;
        console.log("Attempted to log in with: (Hashed)" + hashedPassword);
        User.findOne({ Username: req.body.Username }).then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "Username not in system"
                });
            }
            else {

                if (hashedPassword == user.HashedPassword) {
                    res.writeHead(200, {
                        'Set-Cookie': 'authenticatedRequest=' + hashedPassword
                    });
                    res.end("true");
                }
                else
                    res.end("false");
            }
        });
    });
    app.get("/auth/", (req, res) => {
        var isAuthenticated = authenticated.checkIsAuthenticatedRequest(req, res);
        res.send(isAuthenticated);
    });
}