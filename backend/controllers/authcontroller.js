const ethers = require('ethers');
const { User } = require('../models/user-model');
const jwt = require('jsonwebtoken')
require('dotenv').config();

async function authController(req, res) {
    try {
        const { signature } = req.body;
        const { address } = req.query;
        if (!signature) {
            return res.status(401).josn({ msg: "Signature not provided" })
        }
        const recoverdAddress = ethers.utils.verifyMessage("Welcome to Crypto Vault Website", signature);
        
        if (address.toLowerCase() === recoverdAddress.toLowerCase()) {
            const userExist = await User.findOne({
                userAddress:recoverdAddress,
            })

            if (!userExist) {
                await User.create({
                    userAddress:address
                })
            }
            
            const token = jwt.sign({
                address
            },process.env.SECRET)
            res.status(200).json({ msg: "authentication successful", token:token });

        } else {
            res.status(400).json({msg:"authentication failed"})
        }
    } catch (error) {
        res.status(500).json({ msg: "error in authcontroller", error: error.message })
    }

}
    module.exports = {
        authController,
    }