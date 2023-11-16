const router = require("express").Router();
const userModel = require("./user");
const postModel = require("./post");
const user = require("./user");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/createuser", async (req, res, next) => {
  const createdUser = await userModel.create({
    username: "Diwas",
    email: "diwaskarki96@gmail.com",
    password: "diwas",
    fullName: "Diwash Karki",
    posts: [],
  });
  res.send(createdUser);
});

router.get("/createpost", async (req, res, next) => {
  let createdPost = await postModel.create({
    postText: "Hello createdpost",
  });
  res.send(createdPost);
});

module.exports = router;
