'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Twit = require('twit');
var Tweet = require('../models/tweet.js');
var User = require('../models/user.js');
var md5 = require('md5');
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
router.post('/register', function(req, res, next) {
  var email = req.body.email;
  var userHash = md5(email);
  var saveUser = {
    email: email,
    userHash: userHash
  };
  res.json(saveUser);
});

var averageSentiment = function(fullTweets) {
  var total = 0;
  console.log(fullTweets);
  fullTweets.forEach(function(e, i) {
    console.log(e.sentiment);
    total += e.sentiment.comparative;
  });
  return total / fullTweets.length;
};
router.get('/statistics', function(req, res, next) {
  // pass in the search term
  var currentTime = new Date().getTime();
  var dayLength = 86400000;
  var previousDay = currentTime - dayLength;
  Tweet.find({time_num: {$gte: previousDay}}).exec(function(err, tweets) {
    if(err){console.log(err);}
    var results = {
      numberOfTweets: tweets.length
      // avgSentiment: averageSentiment(tweets)
    };
    res.json(results);
  });
  // Tweet.find => within last 24 hours
  // analyze data
  // res.json data
});

router.post('/theMoney', function(req, res, next) {
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
