let express = require("express");
let router = express.Router();

router.get("/", function (req, res) {
  res.send("Welcome to librabry API!");
});

require('./AuthorRoutes')(router);
require('./BookRoutes')(router);

module.exports.router = router;
