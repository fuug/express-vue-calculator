require('dotenv/config');
const fs = require("fs");
const Order = require('../models/Order');

const {validationResult} = require("express-validator");


class OrderController {

    async list(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({success: false, error: errors})

            const orderList = await Order.find();
            if (orderList) return res.json({success: true, order_list: orderList})

            return res.status(400).json({success: false, error: 'order.not_found'});
        } catch (e) {
            res.status(400).json({success: false, error: e})
        }
    }

    async store(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({success: false, error: errors})
            const rawOrder = req.body.order;

            rawOrder.canvasList.forEach(canvasItem => {
                const img = canvasItem.img.replace(/^data:image\/png;base64,/, "");
                canvasItem.img = img;
                canvasItem.imgPath = './orders/' + new Date().getTime() + '.png';
                fs.writeFile(canvasItem.imgPath, img, 'base64', function (err) {
                    if (err) console.log(err);
                });
            })

            const order = new Order({...rawOrder, user: req.user._id})
            await order.save();
            return res.json({success: true, order})
        } catch (e) {
            res.status(400).json({success: false, error: e})
        }
    }
}

module.exports = new OrderController();