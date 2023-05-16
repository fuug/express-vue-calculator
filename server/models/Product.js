const {Schema, model} = require('mongoose');

const Product = new Schema({
    type: {type: String, required: true},
    price: {type: String, required: true},
    color: {type: String, required: true},
    name: {type: String, required: true},
})

module.exports = model('Product', Product)
