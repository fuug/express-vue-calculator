const express = require("express");
const {check} = require("express-validator");
const UserController = require('../controllers/userController');
const AuthMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/current', AuthMiddleware, UserController.index);


module.exports = router;
