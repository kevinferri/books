exports.getRequestBody = function(req, res, done) {
  var body = '';
  req.on('data', function (data) {
    body += data;
    if (body.length > 1e6) {
      req.connection.destroy();
    }
  });
  req.on('end', function () {
    return done(null, JSON.parse(body));
  });
}
