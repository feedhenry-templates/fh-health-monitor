// route /auth
var router = require("express").Router();
var express = require("express");
var bodyParser = require("body-parser");
var Request = require("request");
router.use(bodyParser.urlencoded());
router.use(bodyParser.json());

//post auth
router.post("/", function(req, res) {
  var opts = { body: req.body, json: true };
  opts.policyId = process.env.AUTH_POLICY;
  opts.url = process.env.FH_MILLICORE + '/box/srv/1.1/admin/authpolicy/auth';
  
  Request.post(opts).pipe(res);
});

module.exports = router;
