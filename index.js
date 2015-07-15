'use strict';
var mongoose = require('mongoose');
var Twit = require('twit');

mongoose.connect(process.env.MONGOLAB_URI);

// var SearchSchema = new mongoose.Schema({
//   hash: {type: String, required: true},
//   tweets: [{type: mongoose.Schema.ObjectId, ref: 'Tweet'}]
// });

// var Search = mongoose.model("Search", SearchSchema);

// var UserSchema = new mongoose.Schema({
//   userEmail: String,
//   password: String,
//   tweetsTracked: [{ype:mongoose.Schema.ObjectId, ref: 'Search'}]
// });

// var  = mongoose.model("Search", SearchSchema);

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var stream = T.stream('statuses/filter', { track: 'angular' });

var userObj = {};
stream.on('tweet', function (tweet) {
  var user = tweet.user.name;
  if(userObj[user]){
    userObj[user] += 1;
  }else{
    userObj[user] = 1;
  }
  console.log("USEROBJ:::", userObj);
  console.log(tweet);
  console.log('**********', tweet.user.location);
  console.log('##########', tweet.text);
});
