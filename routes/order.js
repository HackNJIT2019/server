var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var usermodel = require('../models/userSchema');
var orderSchema = require('../models/orderSchema');
var router = express.Router();

var orderController = require('../controllers/orderController');
var authenticate = require('../authenticate');
// var trialuser = require('../models/trialusermodel');
var request = require('request');

router.use(bodyparser.json());

router.route('/')
.get(orderController.getAllOrders)
.post(orderController.uploadOrder);

router.route('/:orderId')
.get(orderController.getSingleOrder);

module.exports = router;