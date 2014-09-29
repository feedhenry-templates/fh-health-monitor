exports.get=get;
exports.set=set;

var sysEnv=process.env;
var hardCoded={
  "staticFolder":__dirname+"/client/",
  "TIMER_INTERVAL":10,
  "FH_MONGODB_CONN_URL":"mongodb://fhmonitor:fhmonitor@ds063879.mongolab.com:63879/fhhms",
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
