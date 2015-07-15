module.exports = function(app, passport) {

  app.get('/', isLoggedIn, function(req, res, next) {
    res.render('index');
  });

  // app.get('/login', function(req, res) {
  //   res.render('login.hbs');
  // });
  //
  // app.post('/login', passport.authenticate('local-login', {
  //   successRedirect : '/',
  //   failureRedirect : '/login'
  // }));
  //
  // app.get('/signup', function(req, res) {
  //   res.render('signup.hbs');
  // });
  //
  // app.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect : '/',
  //   failureRedirect : '/signup'
  // }));
  //
  // app.get('/logout', function(req, res) {
  //   req.logout();
  //   res.redirect('/');
  // });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
