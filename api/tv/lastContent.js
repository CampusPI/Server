
var lastContent = function(request, reply) {
  var db = request.server.plugins.mongodb.db;
  var lastContent = db.collection('lastContent');
  switch (request.method) {
  case 'get':
    lastContent.find().sort({count: -1}, function (err, results) {
      reply(results);
    });
    break;
  default:
    reply({
      error: 'invalid operation',
      success: false
    });
    break;
  }
};

module.exports.handler = lastContent;
