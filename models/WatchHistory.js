const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const watchHistorySchema = new Schema({
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
  playedDuration: {
    type: Number, // in minutes
    required: true,
    default: 0, // default value if not provided
  },
  movieDuration: {
    type: Number, // in minutes
    required: true,
    default: 0, // default value if not provided
  },
  lastPlayed: {
    type: Date,
    required: true,
    default: Date.now, // default value if not provided
  },
});

const WatchHistory = mongoose.model("WatchHistory", watchHistorySchema);

module.exports = WatchHistory;
