var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  userHash: String,
  searchTerms: [{
    term: { type: String, required: true },
    tweetIds: [ { type: mongoose.Schema.ObjectId, ref: 'Tweet' } ]
  }]
});

var User = mongoose.model("User", userSchema);

module.exports = User;
