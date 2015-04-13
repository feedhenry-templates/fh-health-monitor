exports.get=get;
exports.set=set;

var sysEnv=process.env;
var hardCoded={
  "staticFolder":__dirname+"/static/client/",
  "staticErrorFolder":__dirname+"/static/error/",

  "TIMER_INTERVAL":10,
  "FH_MONGODB_CONN_URL":"mongodb://127.0.0.1/FH_LOCAL",
  "FH_PORT":8801
}
var dynamic={

}

function get(key,def){
  return dynamic[key]?dynamic[key]:sysEnv[key]?sysEnv[key]:hardCoded[key]?hardCoded[key]:def;
}


function set(key, val){
  dynamic[key]=val
}
