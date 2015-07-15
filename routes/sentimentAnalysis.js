var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Twit = require('twit'),
    speak = require('speakeasy-nlp');
    trackArray = ['@codinghouse'];

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

var stream = T.stream('statuses/filter', {
  track: trackArray
});
stream.on('tweet', function(tweet){
 console.log(tweet.text);
});

router.post('/:toTrack', function(req, res, next){
  console.log(req.params.toTrack);
  var toTrack = req.params.toTrack;
  trackArray.push(req.params.toTrack);
  res.end();
});

router.get('/', function(req, res){
  console.log("I exist!")
});

module.exports = router;
