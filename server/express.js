module.exports = initServer;

var express = require("express");
var app = express();
var env = require("../env");
var port = env.get("FH_PORT", 8801);
var log = require("../log");

function initServer(cb) {
  //app routes
  app.use("/", require("./routes/home"));
  app.use("/checks", require("./routes/check"));
  app.listen(port);
  log.info("Server started at port:" + port);
  cb();
}
