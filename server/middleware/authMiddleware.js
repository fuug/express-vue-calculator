require('dotenv/config');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

module.exports = async function (req, res, next) {
    if (req.method === 'OPTIONS') next()

    try {
        if (!req.headers.authorization) return res.status(400).json({success: false, error: 'no_auth'})

        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(400).json({success: false, error: 'no_auth'})

        const decodedData = jwt.verify(token, process.env.API_SECRET);

        req.user = await User.findById(decodedData.id)

        next();
    } catch (e) {
        res.status(400).json({success: false, error: e})
    }
}