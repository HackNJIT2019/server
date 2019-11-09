var express = require('express');
var mongoose = require('mongoose');
var usermodel = require('../models/userSchema');
var authenticate = require('../authenticate');
// var trialuser = require('../models/trialusermodel');
var request = require('request');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  usermodel.find({})
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/signup', (req, res, next) => {
  let newUser = new usermodel({
    email: req.body.email,
    password: req.body.password,
    contactno: req.body.contactno,
    address: req.body.address,
    cash: req.body.cash
  });

  usermodel.findOne({email: req.body.email}, (err, user) => {
    if(user) {
      console.log('user exist');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json({success: false, err: 'User already exists'});
    }
    if (!user) {
      console.log('user not present');
      usermodel.addUser(newUser, (err, user) => {
        if(err) {
            console.log('hello!');
            res.statusCode = 500;
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, err: err});
        }
        else {
            res.statusCode = 200;
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, status: 'Registration Successful!'});
            console.log("user: ", user);
        }
      });
    }
    if (err) {
      console.log('err');
      res.statusCode = 500;
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, err: err});
    } 
  });
});

module.exports = router;
