var mgr=require("../../libs/checkMgr")

describe("check manager",function(){
  before(function(done){
    require("../../data/db/mongoose")(done);
  });
  it ("should respond on time call",function(done){
    mgr.onTimerCall();
    setTimeout(function(){
      done();
    },1000);
  });
})
