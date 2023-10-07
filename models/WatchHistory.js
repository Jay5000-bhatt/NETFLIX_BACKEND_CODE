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
  duration: {
    type: Number, // in minutes
  },
});

const watchHistory = mongoose.model("WatchHistory", watchHistorySchema);

module.exports = watchHistory;
