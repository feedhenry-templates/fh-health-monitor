//add / route to app

var router=require("express").Router();
var express=require("express");
var env=require("../../../env");
router.use(express.static(env.get("staticFolder")));
module.exports=router;
