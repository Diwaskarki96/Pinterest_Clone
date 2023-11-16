const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/Pinterest")
  .then(console.log("Database is connected"));
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  posts: [],
  dp: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);