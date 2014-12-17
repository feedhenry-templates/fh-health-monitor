var mgr = require("../../libs/checkMgr");
var proxyquire =  require('proxyquire');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

module.exports = {
  setUp: function(done) {
    proxyquire("../../data/db/mongoose", {
      mongoose: mockgoose(mongoose)
    })(done);
  },

  'respond on timer call': function(test) {
    mgr.onTimerCall();
    setTimeout(function() {
      test.done();
    }, 1000);
  }
};