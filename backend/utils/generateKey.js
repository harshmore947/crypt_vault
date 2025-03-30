const crypto = require("crypto");

//function to generate a secure encryption key
const generateEncryptionKey = (length) => {
    return crypto.randomBytes(length / 2).toString('hex');
}

module.exports = {generateEncryptionKey}