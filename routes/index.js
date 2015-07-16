'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Twit = require('twit');
var cors = require('cors');

var stripe = require("stripe")("");

// mongoose.connect(process.env.MONGOLAB_URI);

// TweetSchema = new mongoose.Schema({
//   userName: String,
//   count: Number,
//   location: String,
//   tweet: [],
//
// })

router.post("/recordService", cors(), function(req, res) {
  console.log(req.body.token);

  stripe.charges.create({
    amount: 4995,
    currency: "usd",
    source: req.body.token,
    description: "Email: " + req.body.email + " - searchTerm: " + req.body.searchTerm,
    metadata: { userEmail: req.body.email, searchTerm: req.body.searchTerm }
  }, function(err, charge) {
    console.log(err);
    res.json(charge);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// var T = new Twit({
//   consumer_key: process.env.CONSUMER_KEY,
//   consumer_secret: process.env.CONSUMER_SECRET,
//   access_token: process.env.ACCESS_TOKEN,
//   access_token_secret: process.env.ACCESS_TOKEN_SECRET
// });

// console.log(T);
// var stream = T.stream('statuses/filter', { track: 'angular' });

// var userObj = {};
