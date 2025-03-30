const { User } = require('../models/user-model');
const { decryptData } = require('../utils/decryption');
const PINATA_GATEWAY_URL = "https://gateway.pinata.cloud/ipfs/"
const axios = require('axios');

async function returnIpfsResponse(ipfsHash){
    const res = await axios(`${PINATA_GATEWAY_URL}${ipfsHash}`)
    return res.data
}

async function getImageController(req, res) {
    try {
        const address = req.address; // Ensure correct property
        if (!address) {
            return res.status(400).json({ msg: "User address is required" });
        }

        const pageNumber = parseInt(req.query.page) || 1;
        const limitNumber = parseInt(req.query.limit) || 1;

        if (pageNumber < 1 || limitNumber < 1) {
            return res.status(400).json({ msg: "Invalid pagination values" });
        }

        if (!Array.isArray(req.body)) {
            return res.status(400).json({ msg: "Invalid request body" });
        }

        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = pageNumber * limitNumber;

        const ipfsHashArray = req.body.slice(startIndex, Math.min(req.body.length, endIndex)); 
        console.log(ipfsHashArray);

        const userAddress = address.toLowerCase();
        const user = await User.findOne({ userAddress });

        if (!user) {
            return res.status(401).json({ msg: "User doesn't exist" });
        }

        const depcryptedImageArr=[]

        if(ipfsHashArray.length!==0){
            const encryptedDataArr = await Promise.all(ipfsHashArray.map(async(ipfsHash)=>{
                const res= await returnIpfsResponse(ipfsHash)
                return res
            }))

            for(const img of encryptedDataArr ){
                const decryptedImgData = decryptData(img.encryptedData, img.iv,user.encryptionKey)
                depcryptedImageArr.push(decryptedImgData.toString('base64'))
            }
        }
        console.log(depcryptedImageArr)

        res.status(200).json({message:"Image Sent",depcryptedImageArr})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error", error:error.message });
    }
}

module.exports = {
    getImageController
};
