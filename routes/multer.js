const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/img/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueFileName = uuidv4();
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
