var mgr = require("../../libs/checkMgr");

module.exports = {
  setUp: function(done) {
    require("../../data/db/mongoose")(done);
  },

  'respond on timer call': function(test) {
    mgr.onTimerCall();
    setTimeout(function() {
      test.done();
    }, 1000);
  }
};