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

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

User.find({}, function(err, users) {
  users.forEach(function(user) {
    user.searchTerms.forEach(function(searchTerm) {
      // Tweet.find({'_id': { $in: searchTerm.tweetIds}}, function(err, tweets) {
      //   console.log(tweets.length);
      // });
      var stream = T.stream('statuses/filter', { track: searchTerm.term });
      stream.on('connect', function() {
        console.log("Stream for " + searchTerm.term + " connected.");
      });
      stream.on('disconnect', function() {
        console.log("Stream for " + searchTerm.term + " disconnected.");
      });
      stream.on('tweet', function (tweet) {
        console.log('##########', tweet.text);
        var mongoTweet = new Tweet(tweet);
        mongoTweet.save(function(err, savedTweet) {
          if (err) {
            console.error(err);
            throw err;
          } // Think about this
          console.log(savedTweet._id);
          searchTerm.tweetIds.push(savedTweet._id);
          user.save();
        });
      });
    });
  });
});
