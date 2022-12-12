const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    from: {
      // reviews recieved 'from'
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      // reviews given 'to'
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;