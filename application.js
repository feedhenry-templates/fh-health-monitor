var log = require("./log");
var async = require("async");
var initialised = false;
log.info("System start to initialise");
async.series([ //the order of components being initialised is important
  require("./data/db/mongoose"),
  require("./server/express"),
  require("./libs/timer").init.bind(require("./libs/timer")),
  require("./libs/checkMgr").init
], function(err) {
  if (!initialised) {
    initialised = true;
    if (err) {
      log.error("System failed initialising.");
      log.error(err.toString());
    } else {
      log.info("System initialised successfully.");
      //startup whole system
    }
  }else{
    if (err){
      log.error(err.toString());
    }
  }
});
