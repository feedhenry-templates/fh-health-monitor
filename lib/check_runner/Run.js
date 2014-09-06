module.exports = Run;
var models = require("../../lib/data/mongoose/allModel");
var CheckModel = models["Check"];
var RunModel = models["Run"]
var ObjectId = require("mongoose").Types.ObjectId;
var log = require("../../log");

function Run() {
  this.checkId = process.argv[2];
  this.finished = false;
  log.info("Checkid is:" + this.checkId);
}
Run.prototype.init = function(cb) {
  require("../../lib/data/db/mongoose")(cb);
}
Run.prototype.loadCheck = function(cb) {
  CheckModel.findById(new ObjectId(this.checkId), cb);
}
Run.prototype.getConfig = function() {
  return this.check.config;
}
Run.prototype.beforeRun = function(cb) {
  var self = this;
  this.loadCheck(function(err, check) {
    if (err) {
      cb(err);
    } else {
      self.check = check;
      self.initCheck();
      self.runInst = new RunModel({
        checkId: self.checkId,
        checkObj: check,
        startDate: new Date()
      });
      cb();
    }
  });
}

Run.prototype.onRun = function(cb) {
  throw ("not implemented");
}
Run.prototype.afterRun = function(cb) {
  if (this.finished) {
    //TODO some log 
    return cb();
  }
  this.finished = true;
  this.runInst.endDate = new Date();
  var self = this;
  this.check.save(function(err, m) {
    self.runInst.save(cb);
  });
}
Run.prototype.initCheck = function() {
  var check = this.check;
  if (!check.totalRun) {
    check.totalRun = 0;
  }
  check.totalRun += 1;
  check.lastRun = new Date();
}
Run.prototype.failCheck = function() {
  var check = this.check;
  check.lastPass = false;
  check.lastFail = new Date();
  //TODO add notification
}
Run.prototype.sucCheck = function() {
  var check = this.check;
  check.lastPass = true;
  if (!check.passedRun){
    check.passedRun=0;
  }
  check.passedRun += 1;

}
Run.prototype.bootstrap = function() {
  var self = this;

  this.init(function(err) {
    if (err) {
      log.error("Initilise failed.");
      log.error(err.toString());
      self.terminate(1);
    }
    log.info("Start to run for check:" + self.checkId);
    self.beforeRun(function(err) {
      if (err) {
        log.error("Bootstrap a check running failed.");
        log.error(err);
        self.terminate(1);
      } else {
        function _afterRunCb(err) {

          if (err) {
            log.error("After run failed.");
            log.error(err);
            self.terminate(1);
          } else {
            log.info("Running finished for check: " + self.checkId);
            self.terminate(0);
          }
        }
        var timer = setTimeout(function() {
          log.error("Timeout to run check:" + self.checkId);
          self.runInst.isSuccessful = false;
          self.runInst.failReason = "Execution timeout.";
          self.failCheck();
          self.afterRun(_afterRunCb);
        }, self.check.timeout * 1000);
        //todo add timeout check
        self.onRun(function(err, res) {
          clearTimeout(timer);
          if (err) {
            log.error("Running check failed.");
            log.error(err.toString());
            self.runInst.isSuccessful = false;
            self.runInst.failReason = err.toString();
            self.runInst.response = res?res.toString():"";
            self.failCheck();
          } else {
            log.info("Running check succeed.");
            self.runInst.isSuccessful = true;
            self.runInst.response = res.toString();
            self.sucCheck();
          }
          self.afterRun(_afterRunCb);
        });
      }
    });
  });
}
Run.prototype.terminate = function(exitCode) {
  process.exit(exitCode);
}
