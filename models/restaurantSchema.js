var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const Schema = mongoose.Schema;

// var menuSchema = new Schema({
//     itemName: {
//         type: String,
//         default: ''
//     },
//     description: {
//         type: String,
//         default: ''
//     },
//     price: {
//         type: String,
//         default: '0'
//     }
// });

var restaurantSchema = new Schema({

    name: {
        type: String,
        default: ''
    },
    menu: {
        type: {
            items: {
                type: [{
                    itemName: {
                        type: String,
                        default: ''
                    },
                    description: {
                        type: String,
                        default: ''
                    },
                    price: {
                        type: String,
                        default: '0'
                    },
                    veg: {
                        type: Boolean,
                        default: false
                    }
                }]
            },
            default: []
        },
        default: null
    },
    location: {
        type: String,
        default: ''
    },
    priceRange: {
        type: String,
        default: 'Low'
    },
    rating: {
        type: String,
        default: '0'
    }
});

var Restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = Restaurant;