var Run = require("./Run");
var util = require("util");
var request = require("request");

function HttpRun() {
  Run.call(this);
}
util.inherits(HttpRun, Run);
HttpRun.prototype.onRun = function(cb) {
  var params = this.getConfig();
  var self = this;
  request(params, function(err, im, body) {
    if (err) {
      cb(err, body);
    } else if (im.statusCode != 200) {
      cb("Status code is: " + im.statusCode, JSON.stringify({
        "headers": im.headers,
        "body": body
      }));
    } else if (!self.regexpCheck(body)) {
      cb("Regular expression check failed. Regexp:" + params.regexpCheck, JSON.stringify({
        "headers": im.headers,
        "body": body
      }));
    } else {
      cb(null, JSON.stringify({
        "headers": im.headers,
        "body": body
      }));
    }
  });
}

HttpRun.prototype.regexpCheck = function(body) {
  var regexpStr = this.getConfig().regexpCheck;
  if (!regexpStr || regexpStr == "") {
    return true;
  }
  var regexp = new RegExp(regexpStr);
  return regexp.test(body);
}


var c = new HttpRun()
c.bootstrap();
