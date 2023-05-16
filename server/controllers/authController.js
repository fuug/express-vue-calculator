require('dotenv/config');
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')

function createAccessToken(id, roles) {
    return jwt.sign({id, roles}, process.env.API_SECRET)
}

function removeAccessToken(id, roles) {
    return jwt.sign({id, roles}, process.env.API_SECRET)
}

class AuthController {
    async index(req, res) {
        try {
            const users = await User.find()
            return res.json({success: true, users});
        } catch (e) {
            res.status(400).json({success: false, error: e})
        }
    }

    async signup(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({success: false, error: errors})

            const {email, password, second_password, name} = req.body;
            const findUser = await User.findOne({email: email})

            if (findUser) return res.status(400).json({
                success: false,
                error: {errors: [{msg: 'user.email.exist'}]}
            })

            if (password !== second_password) return res.status(400).json({
                success: false,
                error: {errors: [{msg: 'passwords.not_equal'}]}
            })


            const userRole = await Role.findOne({value: 'user'})

            const hashPassword = bcrypt.hashSync(password, 5);
            const user = new User({name, email, password: hashPassword, roles: [userRole.value]});
            await user.save();

            const token = createAccessToken(user._id, user.roles);

            return res.json({success: true, token: token})
        } catch (e) {
            res.status(400).json({success: false, error: e})
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({success: false, error: errors})

            const {email, password} = req.body;
            const user = await User.findOne({email});

            if (!user) return res.status(400).json({success: false, error: {errors: [{msg: 'user.email.wrong'}]}});

            const isValidPassword = bcrypt.compareSync(password, user.password);

            if (!isValidPassword) return res.status(400).json({
                success: false,
                error: {errors: [{msg: 'user.password.wrong'}]}
            });

            const token = createAccessToken(user._id, user.roles);

            return res.json({success: true, token: token});
        } catch (e) {
            return res.status(400).json({success: false, error: e})
        }
    }
}

module.exports = new AuthController();