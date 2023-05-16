const express = require("express");
const {check} = require("express-validator");
const OrderController = require('../controllers/orderController');
const AuthMiddleware = require('../middleware/authMiddleware')
const AdminMiddleware = require('../middleware/adminMiddleware')
const router = express.Router()

router.post('/create', [
    AuthMiddleware,
    check('order', 'order required').notEmpty(),
], OrderController.store);

router.get('/', [
    AdminMiddleware,
], OrderController.list);


module.exports = router;
