'use strict';
var mongoose = require('mongoose');
var Twit = require('twit');

mongoose.connect(process.env.MONGOLAB_URI);
var tweetSchema = new mongoose.Schema({}, { strict: false });
var Tweet = mongoose.model('Tweet', tweetSchema);

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  searchTerms: [{
    term: { type: String, required: true },
    tweetIds: [ { type: mongoose.Schema.ObjectId, ref: 'Tweet' } ]
  }]
});

var User = mongoose.model("User", userSchema);

// User.create({ email: 'test1@test.com', searchTerms: [{ term: 'angular' }, { term: 'emberjs' }] });

// var T = new Twit({
//   consumer_key: process.env.CONSUMER_KEY,
//   consumer_secret: process.env.CONSUMER_SECRET,
//   access_token: process.env.ACCESS_TOKEN,
//   access_token_secret: process.env.ACCESS_TOKEN_SECRET
// });

User.find({}, function(err, users) {
  console.log(users);
});

// loop over all search terms for all users and for each do the following:
//
  // var stream = T.stream('statuses/filter', { track: 'angular' });

  // stream.on('tweet', function (tweet) {
  //   console.log('##########', tweet.text);
  //   var mongoTweet = new Tweet(tweet);
  //   mongoTweet.save();
  // });
