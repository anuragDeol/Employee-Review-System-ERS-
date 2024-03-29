const User = require("../models/users");
const Review = require("../models/review");

// create new review
module.exports.createReview = async function (req, res) {
  try {
    let recipient = await User.findById(req.params.id);
    if (!recipient) {
      return res.redirect("/");
    }

    for (let i = 0; i < recipient.from.length; i++) {
      // user can review only if logged in
      if (req.user) {
        if (recipient.from[i] == req.user.id) {
          await Review.create({
            to: recipient.id,
            from: req.user.id,
            review: req.query.newReview,
          });
          return res.redirect("/");
        }
      } else {
        return res.redirect("/user/login");
      }
    }
    return res.redirect("/");
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
