const PinataSDK = require('@pinata/sdk');
const fs = require('fs');
const { Blob } = require('buffer');
const { User } = require('../models/user-model');
const { generateEncryptionKey } = require('../utils/generateKey');
const { encryptFile } = require('../utils/encryption');
require('dotenv').config()

const pinata = new PinataSDK(process.env.API_KEY, process.env.API_SECRET);

async function uploadImageController(req, res) {
    try {
        const address = req.address;
        if (!address) {
            return res.status(400).json({ msg: "User address is required" });
        }
        
        const userAddress = address.toLowerCase();
        const user = await User.findOne({ userAddress });

        if (!user) {
            return res.status(401).json({ msg: "User doesn't exist" });
        }

        if (!user.encryptionKey) { // Ensure encryptionKey is checked properly
            const encryptionKey = generateEncryptionKey(32);
            user.encryptionKey = encryptionKey;
            await user.save();
        }

        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        const { encryptedData, iv } = encryptFile(req.file.buffer, user.encryptionKey);

        const resPinata = await pinata.pinJSONToIPFS({ encryptedData, iv });
        console.log(resPinata);

        res.status(201).json({ msg: "Image upload successful", ipfsHash: resPinata.IpfsHash });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ msg: "Error in uploading image", error: error.message });
    }
}

module.exports = {
    uploadImageController
}