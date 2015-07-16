'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Twit = require('twit');
var Tweet = require('../models/tweet.js');
var User = require('../models/user.js');
var md5 = require('md5');

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
  saveUser.searchTerms.term.push(req.body.terms);
  res.json(saveUser);
});

router.get('/dashboard/:hash', function(req, res, next) {
  User.find({userHash: req.params.hash}, function(err, user) {
    if (err) {
      res.status(404);
    }
    else if (!user) {
      res.status(404);
      res.redirect('/');
    }
    Tweet.find({'_id': {$in: user.searchTerms.tweetIds}}, function(err, tweets) {
      if (err) {
        res.status(404);
      }
      console.log(tweets);
      res.json(tweets);
    });
  });
});

var averageSentiment = function(fullTweets) {
  var total = 0;
  fullTweets.forEach(function(e, i) {
    total += e.sentiment.comparative;
  });
  console.log(total / fullTweets.length);
  return total / fullTweets.length;
};
router.get('/statistics', function(req, res, next) {
  // pass in the search term
  var currentTime = new Date().getTime();
  var dayLength = 86400000;
  var previousDay = currentTime - dayLength;
  Tweet.find({time_num: {$gte: previousDay}}).exec(function(err, tweets) {
    if(err) {
      console.log(err);}
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
  var email = req.body.email;
  var userHash = md5(email);
  var saveUser = {
    email: email,
    userHash: userHash
  };
  saveUser.searchTerms = [];
  saveUser.searchTerms[0] = {};
  saveUser.searchTerms[0].term = req.body.searchTerm;
  var newUser = new User(saveUser);
  newUser.save(function(err, user) {
    if (err) {
      res.status(400).json({ error: "Validation failed" });
    }
    res.json(user);
  });
  // res.json(req.body);
});

module.exports = router;
