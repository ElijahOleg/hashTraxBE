var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) { // callback with email and password from our form
    User.findOne({ 'email' :  email }, function(err, user) {
      if (err)
        return done(err);

      if (!user)
        return done(null, false);

      if (!user.validPassword(password))
        return done(null, false);

      return done(null, user);
    });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
  },
  function(email, password, done) {
    console.log(email, password);
    process.nextTick(function() {
      User.findOne({ 'email' :  email }, function(err, user) {
        if (err)
          return done(err);
        if (user) {
          console.log(user, done);
          return done(null, false);
        } else {
          var newUser = new User();
          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err) {
              console.log(err)
              throw err;
            }
            console.log(newUser);
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
