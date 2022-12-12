const User = require("../models/users");
const Review = require("../models/review");

// create new user
module.exports.createUser = async function (req, res) {
  try {
    if (req.body.password  != req.body.password2) {
      return res.redirect("/users/register");
    }

    let user = await User.findOne({ email: req.body.email });

    if(user) {
      console.log("User already exist. Try sign in.");
      return res.redirect("/users/register");
    } else {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        isAdmin: false,
        password: req.body.password,
      });
      if(req.user && req.user.isAdmin) {
        return res.redirect("/");
      }
      return res.redirect("/users/login");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("/users/register");
  }
};

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};


module.exports.destroySession = function (req, res) {
  req.logout(function(err) {
    if(err) {
      return next(err);
    }
  });
  console.log("Success! User logged out.");
  return res.redirect("/users/login");
};

module.exports.login = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('back');
  }
  return res.render("login", {
    title: "Login",
  });
};


// register a new user
module.exports.register = function (req, res) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    // if user is logged in && is an admin...
    // ...the admin can register a new employee
    return res.render("addUser", {
      title: "Add User",
    });
  }

  if (req.isAuthenticated()) {
    // if user is logged in but not an admin - redirect to home
    return res.render("home", {
      title: "Home",
    });
  }

  return res.render("register", {
    // register new user
    title: "Register",
  });
};

// home page
module.exports.home = async function (req, res) {
  try {
    // if user is not logged in, redirect to login
    if (!req.isAuthenticated()) {
      return res.redirect("/users/login");
    }


    let user = await User.findById(req.user.id);    // current signed-in 'user'
    let review = await Review.find({ to: req.user.id });  // all the reviews in which current signed in 'user' is reviewed

    let recipients = [];    // all users which are reviewed by current signed-in 'user'

    // user.to - other users, which, current logged in 'user' has reviewed
    for (let i = 0; i < user.to.length; i++) {
      let x = await User.findById(user.to[i]);
      recipients.push(x);
    }

    let reviews = [];

    for (let i = 0; i < review.length; i++) {
      // find users who have reviewed current 'user'
      let thisUserReviewedMe = await User.findById(review[i].from);

      // console.log(thisUserReviewedMe);
      if (thisUserReviewedMe) {
        let currentReview = {
          name: thisUserReviewedMe.name,
          review: review[i].review,
          updated: review[i].updatedAt,
        };
        reviews.push(currentReview);
      }
    }

    return res.render("home", {
      title: "Home",
      recipients: recipients,   // all users who received reviews from current signed 'user'
      reviews: reviews,   // all the reviews in which current 'user' is reviewed
      user: user
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
