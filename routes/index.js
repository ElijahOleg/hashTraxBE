'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Twit = require('twit');
var Tweet = require('../models/tweet.js');
var User = require('../models/user.js');
console.log("Tweet:", Tweet);
console.log("User:", User);


router.get('/data', function(req, res, next) {
  console.log("data hit");
  // console.log(Tweet);
  Tweet.find({}, function(err, tweets){
    if(err){console.log(err);}
    // console.log(tweets);
    res.json(tweets);
  });
  // return;
});

router.get('/statistics', function(req, res, next) {
  // Tweet.find => within last 24 hours
  // analyze data
  // res.json data
});

module.exports = router;
