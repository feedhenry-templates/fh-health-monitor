exports.get=get;
exports.set=set;

var sysEnv=process.env;
var hardCoded={
  "staticFolder":__dirname+"/client/"
}
var dynamic={

}

function get(key,def){
  return dynamic[key]?dynamic[key]:sysEnv[key]?sysEnv[env]:hardCoded[key]?hardCoded[key]:def;
}


function set(key, val){
  dynamic[key]=val
}
