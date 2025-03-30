const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    try {
        const token = req.headers['x-access-token']

        if (!token) {
            return res.status(400).json({ msg: "No token found" });
        }

        const decoded = jwt.verify(token,process.env.SECRET)
        req.address = decoded.address;
        next();
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
}

module.exports = {
    authenticateToken,
}