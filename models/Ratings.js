const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  contentId: {
    type: Schema.Types.ObjectId,
    ref: "Content",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isLiked: {
    type: Boolean,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
