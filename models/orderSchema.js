var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const Schema = mongoose.Schema;

var orderSchema = new Schema({
    userId: {
        type: String,
        default: ''
    },
    userEmail: {
        type: String,
        default: ''
    },
    userContactNo: {
        type: String,
        default: ''
    },
    items: {
        type: [{
            itemName: {
                type: String,
                default: ''
            },
            itemPrice: {
                type: String,
                default: ''
            },

        }],
        default: []
    },
    itemCount: {
        type: String,
        default: '0'
    },
    totalPrice: {
        type: String,
        default: '0'
    }
}, {
    timestamps: true
});

var Order = mongoose.model('order', orderSchema);

module.exports = Order;