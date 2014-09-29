var net=require("net");
module.exports=function(check,runInst,cb){
  var params=check.config;
  var client=net.connect(params,function(){
    client.end();
    cb(null,"Connection made successfully.");
  });
}
