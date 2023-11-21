const router = require("express").Router();
const userModel = require("./users");
const postModel = require("./posts");
const user = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");

isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};
passport.use(new localStrategy(userModel.authenticate()));

router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/login", (req, res, next) => {
  res.render("login", { error: req.flash("error") });
});
router.get("/feed", (req, res, next) => {
  res.render("feed");
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("Profile");
});

router.post("/register", async (req, res) => {
  try {
    const userData = new userModel({
      username: req.body.username,
      email: req.body.email,
      fullname: req.body.fullname,
    });
    await userModel.register(userData, req.body.password).then(() => {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/profile");
      });
    });
  } catch (error) {
    console.error("error ", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",

    failureFlash: true,
  }),
  (req, res) => {}
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// router.get("/createuser", async (req, res, next) => {
//   let createdUser = await userModel.create({
//     username: "Diwas",
//     email: "diwaskarki96@gmail.com",
//     password: "diwas",
//     fullName: "Diwash Karki",
//     posts: [],
//   });
//   res.send(createdUser);
// });

// router.get("/createpost", async (req, res, next) => {
//   let createdPost = await postModel.create({
//     postText: "Hello another post",
//     user: "65571347e40c0bd0861c7687",
//   });
//   let user = await userModel.findOne({ _id: "65571347e40c0bd0861c7687" });
//   user.posts.push(createdPost._id);
//   await user.save();
//   res.send("done");
// });
// router.get("/alluserposts", async (req, res) => {
//   let userPosts = await userModel
//     .findOne({ _id: "65571347e40c0bd0861c7687" })
//     .populate("posts");
//   res.send(userPosts);
// });
module.exports = router;
