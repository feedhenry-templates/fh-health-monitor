module.exports = init;

var env = require("../../../env");
var connStr = env.get("FH_MONGODB_CONN_URL", "mongodb://fhmonitor:fhmonitor@127.0.0.1/fhmonitor");
var log = require("../../../log");
var mongoose = require("mongoose");

function init(cb) {
  log.info("Start to initialise database connections.");
  mongoose.connect(connStr, {
    server: {
      auto_reconnect: true
    }
  });
  var db = mongoose.connection;
  db.on("error", cb);
  db.on("connected", function() {
    log.info("Database connected.");
    cb();
  });
  db.on('reconnected', function() {
    log.info('Database connection reconvered!');
  });
}
