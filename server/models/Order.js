const {Schema, model} = require('mongoose');

const Order = new Schema({
    type: {type: String, required: true},
    canvasList: [{
        type: {
            id: {type: Number, required: true},
            width: {type: Number, required: true},
            height: {type: Number, required: true},
            x: {type: Number, required: true},
            y: {type: Number, required: true},
            img: {type: Buffer, required: true},
            imgPath: {type: String, required: true},
        }
    }],
    user:{type: String, ref: 'Role'}
})

module.exports = model('Order', Order)
