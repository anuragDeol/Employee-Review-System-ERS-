const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");

// Authentication using passport
// use passport's 'LocalStrategy'
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding the user");
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("Invalid email or password");
          return done(null, false);
        }

        return done(null, user);  // 'user' found and authenticated
      });
    }
  )
);

// serializing - taking id and setting it into cookie
passport.serializeUser(function (user, done) {
  done(null, user.id); // user's 'id' is encrypted and stored in cookie
});


// deserializing - cookie sent back to server, and fetching the user corresponding to that id
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error while finding user in deseralizing");
      return done(err);
    }
    return done(null, user);    // user found by 'id'
  });
});

passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.redirect("/users/login");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just sending it to the locals for the views
    res.locals.user = req.user; // 'user' is now accessible in views
  }
  next();
};

module.exports = passport;
