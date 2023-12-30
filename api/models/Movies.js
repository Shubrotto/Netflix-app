const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
    imgTitle: {
      type: String,
    },
    imgThumble: {
      type: String,
    },
    trailer: {
      type: String,
    },
    video: {
      type: String,
    },
    imgThumble: {
      type: String,
    },
    duration: {
      type: String,
    },
    limit: {
      type: Number,
    },
    year: {
      type: String,
    },
    genre: {
      type: String,
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamp: true }
);

const Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;
