const mongoose = require('mongoose')

function connectDatabase() {
    mongoose.connect(process.env.MONO_URI).then(()=>{console.log("Mongoose Connected")}).catch((error)=>{console.log("error",error)})
}
module.exports = {
    connectDatabase
}