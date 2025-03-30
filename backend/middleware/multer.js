const multer = require('multer');
const storage = () => multer.memoryStorage(); //store the file data in memory
module.exports = {
    uploadUserImage: multer({ storage: storage() }).single('file')
}