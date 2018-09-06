
const crypto = require('crypto');

const sha256 = (data) => {
    return crypto.createHash("sha256").update(data).digest("base64");
}
const parseCookies = (request) => {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}
exports.checkIsAuthenticatedRequest = (req, res) => {
    var cookies = parseCookies(req);

    if (cookies.authenticatedRequest != null)
    {
        return true;
    }
    else
    {
        return false;
    }
};
exports.authenticationRequired = (method) => {
    var retMethod = (req, res) => {

        if (exports.checkIsAuthenticatedRequest(req, res))
        {
            method(req,res);
        }
        else
        {
            res.status(500).send({
                message: "You are not authenticated to make this request"
            });
        }
    }

    return retMethod;
}