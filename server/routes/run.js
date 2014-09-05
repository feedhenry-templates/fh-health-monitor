var router = require("express").Router();
var express = require("express");
var models = require("../../data/mongoose/allModel");
var bodyParser = require("body-parser");
var ObjectId = require("mongoose").Types.ObjectId;
var checkMgr=require("../../libs/checkMgr");
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
router.get("/",function(req,res){
  console.log(req);
  res.end(req.params.checkId); 
})

module.exports=router;
