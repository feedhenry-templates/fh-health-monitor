
module.exports = function(req, res, next) {
  var readOnly = false;
  console.log('req', req);
  if (req.url !== '/admin') {
    readOnly = true;
  }

  res.render('index', {
    readOnly: readOnly
  }, function(err, html) {
    if (err) return res.status(500).send(err);

    return res.send(html);
  });
};