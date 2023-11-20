const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
const plm = require("passport-local-mongoose");
mongoose.connect(DB_URL).then(console.log("Database is connected"));
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
  },
  fullname: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  dp: {
    type: String,
  },
});
userSchema.plugin(plm);
module.exports = mongoose.model("User", userSchema);
