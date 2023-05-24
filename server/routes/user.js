const express = require("express");
const {check} = require("express-validator");
const UserController = require('../controllers/userController');
const AuthMiddleware = require('../middleware/authMiddleware')
const AdminMiddleware = require('../middleware/adminMiddleware')
const router = express.Router()

router.get('/current', AuthMiddleware, UserController.index);
router.post('/get', [
    AdminMiddleware,
    check('id', 'id.required').notEmpty(),
], UserController.get);


module.exports = router;
