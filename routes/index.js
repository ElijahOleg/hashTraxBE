'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Twit = require('twit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var T = new Twit({
  consumer_key: 'EhXGStDB56VzhYWSH75AHp3nP',
  consumer_secret: 'PTsOhDqYpOJCLWYoRc9JhK1bTlIrWSNqhHs0eqs2YZBcOaft1k',
  access_token: '43787829-ucm2tn89Y1Mg25tPv6s9iGqG1clbvTrUs8CjnE4yy',
  access_token_secret: 'WvnS6UIGv9dXPnNxZ4kijxvFkHcCYDBlHVi5ZxV9MCZ4I'
});

console.log(T);
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

var afterOneWeek = function(){
  userArray
}
