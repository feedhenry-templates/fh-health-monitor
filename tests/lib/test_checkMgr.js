var mgr=require("../../lib/checkMgr")

describe("check manager",function(){
  before(function(done){
    require("../../lib/data/db/mongoose")(done);
  });
  it ("should respond on time call",function(done){
    mgr.onTimerCall();
    setTimeout(function(){
      done();
    },1000);
  });
})
