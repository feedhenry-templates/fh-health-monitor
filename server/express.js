module.exports = initServer;

var express = require("express");
var app = express();
var env = require("../env");
var port = env.get("FH_PORT", 8801);
var log = require("../log");
var mbaas=require("fh-mbaas-express");
function initServer(cb) {
  //FeedHenry mBaas attachement
  app.use("/sys",mbaas.sys([]));
  app.use("/mbaas",mbaas.mbaas);
  app.use(mbaas.fhmiddleware());
  //customised middleware;
  app.use(require("./hostmiddleware"));
  //app routes
  app.use("/", require("./routes/home"));
  app.use("/checks", require("./routes/check"));
  app.use("/runs", require("./routes/run"));
  app.use("/api", require("./routes/api"));

  app.use(mbaas.errorHandler());
  app.listen(port);
  log.info("Server started at port:" + port);
  cb();
}
