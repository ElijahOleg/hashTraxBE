'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Twit = require('twit');

mongoose.connect(process.env.MONGO_URL);

// TweetSchema = new mongoose.Schema({
//   userName: String,
//   count: Number,
//   location: String,
//   tweet: [],
//
// })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

console.log(T);
var stream = T.stream('statuses/filter', { track: 'angular' });

var userArray = [];
stream.on('tweet', function (tweet) {
  var user = tweet.user.name;
  userArray.push(user);
  console.log(tweet);
  console.log('**********', tweet.user.location);
  console.log('##########', tweet.text);
});
