module.exports=Runner;

var util=require("util");
var events=require("events");
var childProc=require("child_process");
var log=require("../log");
function Runner(check){
  this.check=check;
}
util.inherits(Runner,events.EventEmitter);

Runner.prototype.run=function(cb){
  var type=this.check.type;
  var modulePath=__dirname+"/check_runner/"+type+".js";
  log.info("Run check using runner:"+modulePath);
  var c=childProc.fork(modulePath,[this.check._id],{
    env:process.env
  });
  c.on("exit",function(code){
    if (code !=0){
      cb("Check running returns with exit code:"+code);
    }else{
      cb(null);
    }
  });
}
