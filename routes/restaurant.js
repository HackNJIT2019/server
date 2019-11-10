var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var usermodel = require('../models/userSchema');
var restaurantSchema = require('../models/restaurantSchema');
var router = express.Router();

var restaurantController = require('../controllers/restaurantController');
var authenticate = require('../authenticate');
// var trialuser = require('../models/trialusermodel');
var request = require('request');

router.use(bodyparser.json());

router.route('/')
.get(restaurantController.getAllRestaurants);

// get Single restaurant
router.route('/:restId')
.get(restaurantController.getSingleRestaurent);

module.exports = router;