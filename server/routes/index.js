const auth = require('./auth');
const user = require('./user');
const order = require('./order');
const product = require('./product');
const express = require("express");
const router = express.Router()


router.use('/auth', auth)
router.use('/user', user)
router.use('/order', order)
router.use('/product', product)

router.get('/', (req, res) => {
    res.json({status: "success"})
})

module.exports = router;