const crypto = require('crypto');
const salt = "IAmRand0MNString";
const hash = crypto.createHash("sha1");
const password = 'd6F3Efeq';
const algorithm = 'aes-256-cbc';
const sharedSecret = crypto.randomBytes(32);
const initializationVector = crypto.randomBytes(16);

hash.update(salt);

// `hash.digest()` returns a Buffer by default when no encoding is given
let key = hash.digest().slice(0, 32);

exports.encrypt = (text) => {
    return text;
}

exports.decrypt = (encrypted) => {
    
    return encrypted;
}