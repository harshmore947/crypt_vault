const express = require('express');
const { authController } = require('../controllers/authcontroller');
const { uploadImageController } = require('../controllers/uploadController');
const { uploadUserImage } = require('../middleware/multer');
const { authenticateToken } = require('../middleware/authentication');
const { getImageController } = require('../controllers/getImageContorller');
const router = express.Router();

router.post('/auth', authController);
router.post('/uploadImage', uploadUserImage, authenticateToken, uploadImageController);
router.post('/getImage',authenticateToken,getImageController)

module.exports = {
    router
}