var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var Notification = Schema({
  type: Number,
  notificationConfig: Schema.Types.Mixed
});
var Configure = Schema({
  notifications: [Notification],
  type: Number,
  config: Schema.Types.Mixed,
  timeout: Number,
  cronTab: String,
  isSendData: Boolean,
  sendData: String,
  checkResponse: Boolean,
  regexpCheck: String
});
var Check = Schema({
  name: String,
  description: String,
  configure: Configure,
  totalRun: Number,
  succRun: Number
});


var Run = Schema({
  checkId: String,
  checkType: Number,
  runDate: Date,
  endDate: Date,
  elapsedTime: Number,
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
  auth:String
});

module.exports={
  Notification:Notification,
  Configure:Configure,
  Check:Check,
  Run:Run,
  TCPConfig:TCPConfig,
  PINGConfig:PINGConfig,
  HTTPConfig:HTTPConfig
}
