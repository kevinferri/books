exports.getRequestBody = function(req, res, callback) {
  var body = '';
  req.on('data', function (data) {
    body += data;
    if (body.length > 1e6) {
      req.connection.destroy();
    }
  });
  req.on('end', function () {
    return callback(body);
  });
}