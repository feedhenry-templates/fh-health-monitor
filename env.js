exports.get=get;
exports.set=set;

var sysEnv=process.env;
var hardCoded={
  "staticFolder":__dirname+"/client/",
  "TIMER_INTERVAL":10,
  "FH_MONGODB_CONN_URL":"mongodb://fhmonitor:fhmonitor@127.0.0.1/fhmonitor"

}
var dynamic={

}

function get(key,def){
  return dynamic[key]?dynamic[key]:sysEnv[key]?sysEnv[env]:hardCoded[key]?hardCoded[key]:def;
}


function set(key, val){
  dynamic[key]=val
}
