let express = require("express");
let router = express.Router();

router.get("/", function (req, res) {
  res.send("Welcome to librabry API!");
});


module.exports.router = router;
