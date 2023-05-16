require('dotenv/config');
const Product = require('../models/Product');

class ProductController {

    async list(req, res) {
        try {
            const productList = await Product.find();
            if (productList) return res.json({success: true, product_list:productList})

            return res.status(400).json({success: false, error: 'product.not_found'});
        } catch (e) {
            res.status(400).json({success: false, error: e})
        }
    }
}

module.exports = new ProductController();