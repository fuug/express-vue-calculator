const {validationResult} = require("express-validator");
const User = require('../models/User');

class UserController {
    async index(req, res) {
        try {
            if (req.user) return res.json({success: true, user: {email: req.user.email, name: req.user.name, id: req.user.id}});
            return res.status(400).json({success: false, error: 'user.not_found'});
        } catch (e) {
            res.status(400).json({success: false, error: e})
        }
    }

    async get(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({success: false, error: errors})
            const user = await User.findById(req.body.id);
            if (user)
                return res.json({success: true, user: {email: user.email, name: user.name}});

            return res.status(400).json({success: false, error: 'user.not_found'});
        } catch (e) {
            res.status(400).json({success: false, error: e})
        }
    }
}

module.exports = new UserController();