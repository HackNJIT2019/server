var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        unique: true

    },
    password: {
        type: String,
        default: ''
    },
    name : {
        type: String,
        default: ''
    },
    contactno: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    cash: {         // For payments
        type: Boolean,
        default: true
    }

});

var User = mongoose.model('user', userSchema);

module.exports = User;

module.exports.addUser = function(newUser, callback) {
    newUser.save(callback);
}

module.exports.getUserById= function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}