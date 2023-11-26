const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const expressSession = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const flash = require("connect-flash");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(flash());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "Pinterest",
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use("/", indexRouter);
app.get("/error", (req, res) => {
  res.render("error");
});
app.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running at port:${PORT}`);
});
