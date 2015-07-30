
module.exports = function(req, res, next) {
  var readOnly = false;
  if (req.url !== '/admin') {
    readOnly = true;
  }

  res.render('index', {
    authPolicy: process.env.AUTH_POLICY,
    readOnly: readOnly
  }, function(err, html) {
    if (err) return res.status(500).send(err);

    return res.send(html);
  });
};
