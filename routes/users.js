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
    cash: req.body.cash,
    name: req.body.name
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

router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  usermodel.findOne({email: email}, (err, user) => {
    if (err) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      return res.json({success: false, msg: err});
    }
    if (!user) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return res.json({success: false, msg: 'User not found'});
    }
    if ( user ) {
      if ( password == user.password ) {
        const uSer = JSON.stringify(user);
        console.log('jsonuser', uSer);
        const token = authenticate.getToken({_id: user._id});
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({
          success: true,
          token: token,
          user: {
            _id: user._id,
            email: user.email,
            contactno: user.contactno,
            name: user.name
          }
        });
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json({success: false, msg: 'Wrong password!'});
      }
    }
  })
});

module.exports = router;
