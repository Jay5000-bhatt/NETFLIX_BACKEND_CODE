const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // in minutes
    required: true,
  },
  //   languages can be multiple
  language: {
    type: Array,
    required: true,
  },
  coverPhoto: {
    type: String,
    required: true,
  },
  contentUrl: {
    type: String,
    required: true,
  },
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
