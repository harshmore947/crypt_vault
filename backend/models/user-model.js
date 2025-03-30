const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userAddress: {
        type: String,
        required: true,
    },
    encryptionKey: {
        type: Buffer,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const User = mongoose.model("User", userSchema);

module.exports = {
    User
}
