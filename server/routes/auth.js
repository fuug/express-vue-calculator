const express = require("express");
const {check} = require("express-validator");
const AuthController = require("../controllers/authController");
const AdminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router()

router.get('/', AdminMiddleware, AuthController.index);

router.post('/login', [
    check('email', 'user.email.required').notEmpty(),
    check('password', 'user.password.required').notEmpty(),
    check('password', 'user.password.short').isLength({min: 4})
], AuthController.login)

router.post('/signup', [
    check('email', 'user.email.required').notEmpty(),
    check('name', 'user.name.required').notEmpty(),
    check('password', 'user.password.required').notEmpty().isLength({min: 4}),
    check('password', 'user.password.short').isLength({min: 4}),
    check('second_password', 'user.second_password.required').notEmpty(),
    check('second_password', 'user.second_password.short').isLength({min: 4}),
], AuthController.signup)

module.exports = router;