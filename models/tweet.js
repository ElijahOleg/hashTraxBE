var mongoose = require('mongoose');
var tweetSchema = mongoose.Schema({}, { strict: false });
var Tweet = mongoose.model('Tweet', tweetSchema);


module.exports = Tweet;
