const express = require("express");
const {check} = require("express-validator");
const ProductController = require('../controllers/productController')
const router = express.Router()

router.get('/', ProductController.list);


module.exports = router;
