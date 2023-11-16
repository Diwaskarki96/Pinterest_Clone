const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;
const indexRouter = require("./routes");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("./public"));

app.use("/", indexRouter);
app.listen(PORT, (req, res) => {
  console.log(`Server is running at port:${PORT}`);
});
