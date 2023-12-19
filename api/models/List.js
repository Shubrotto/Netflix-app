const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
    },
    genre: {
      type: String,
    },
    content: {
      type: Array,
    },
  },
  { timeStamp: true }
);

const List = mongoose.Model("List", listSchema);

module.exports = { List };
