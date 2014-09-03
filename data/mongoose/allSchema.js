var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var Notification = Schema({
  type: String,
  notificationConfig: Schema.Types.Mixed
});
var Check = Schema({
  name: String,
  description: String,
  type:String,
  config:Schema.Types.Mixed,
  timeout:Number,
  interval:Number,
  notifications:[Notification],
  lastPass:Boolean,
  lastFail:Date,
  createDate:Date
});


var Run = Schema({
  checkId: String,
  checkObj: Object,
  startDate: Date,
  endDate: Date,
  response: String,
  isSuccessful: Boolean,
  failReason: String
});


var TCPConfig=Schema({
  host:String,
  port:String
});


var PINGConfig=Schema({
  host:String
});

var HTTPConfig=Schema({
  url:String,
  method:String,
  headers:Object,
  auth:String,
  body:String,
  regexpCheck:String
});

module.exports={
  Notification:Notification,
  Check:Check,
  Run:Run,
  TCPConfig:TCPConfig,
  PINGConfig:PINGConfig,
  HTTPConfig:HTTPConfig
}
