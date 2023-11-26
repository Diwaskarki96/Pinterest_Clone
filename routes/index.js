const router = require("express").Router();
const userModel = require("./users");
const postModel = require("./posts");
const user = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
const upload = require("./multer");

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
router.post(
  "/upload",
  isLoggedIn,
  upload.single("file"),
  async (req, res, next) => {
    if (!req.file) {
      return res.send(404).send(error.msg, "No files were uploaded");
    }
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const postData = await postModel.create({
      image: req.file.filename,
      imageText: req.body.filecaptiom,
      user: user._id,
    });
    user.posts.push(postData._id);
    await user.save();
    res.redirect("/profile");
  }
);

router.get("/profile", isLoggedIn, async (req, res, next) => {
  const user = await userModel
    .findOne({
      username: req.session.passport.user,
    })
    .populate("posts");

  res.render("Profile", { user });
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

module.exports = router;
