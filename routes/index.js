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
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

var stream = T.stream('statuses/filter', { track: '#growingupblack' });


var userObj = {};
stream.on('tweet', function (tweet) {
  var user = tweet.user.name;
  if(userObj[user]){
    userObj[user] += 1;
  }else{
    userObj[user] = 1;
  }
  console.log("USEROBJ:::", userObj);
});

var afterOneWeek = function(){
  userArray
}
