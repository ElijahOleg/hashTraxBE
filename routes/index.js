'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Twit = require('twit');
var Tweet = require('../models/tweet.js');
var User = require('../models/user.js');
var md5 = require('md5');
var api_key = process.env.MAILGUN_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

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

router.get('/dashboard/:hash', function(req, res, next) {
  console.log(req.params);
  User.findOne({userHash: req.params.hash}, function(err, user) {
    if (err) {
      res.status(404);
    }
    else if (!user) {
      res.status(404);
      res.redirect('/');
    }
    console.log(user.searchTerms[0].tweetIds);
    Tweet.find({'_id': {$in: user.searchTerms[0].tweetIds}}, function(err, tweets) {
      console.log(err, tweets);
      if (err) {
        res.status(404);
      }
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
  var data = {
    from: 'Excited User <no-reply@hashtrax.us>',
    to: email,
    subject: 'Thanks for signing up to HashTraxxx!',
    text: 'View your dashboard at http://hashtrackus.s3-website-us-west-1.amazonaws.com/#!/' + userHash
  };

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
    mailgun.messages().send(data, function (error, body) {
      if(error){
        console.log({ error: error });
        res.status(500).json({ error: error });
      }
      res.json(user);
    });
  });
});

module.exports = router;
