const router = require("express").Router();
const userModel = require("./user");
const postModel = require("./post");
const user = require("./user");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/createuser", async (req, res) => {
  const createdUser = await userModel.create({
    username: "Diwas",
    email: "diwaskarki96@gmail.com",
    password: "diwas",
    fullName: "Diwash Karki",
    posts: [],
  });

  res.send(createdUser);
});

module.exports = router;
