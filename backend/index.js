const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDatabase } = require('./utils/Database');
const { router } = require('./routes/Routes');

const app = express();

connectDatabase(process.env.MONO_URI);
app.use(express.json());

app.use(cors());

app.use('/api', router);
app.listen(3000, () => {
    console.log("Server Running 3000");
})