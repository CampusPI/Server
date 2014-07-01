var i = 0;

var lastContent = function(request, reply) {
  var db = request.server.plugins.mongodb.db;
  var lastContent = db.collection('lastContent');
  switch (request.method) {
    case 'get':
      lastContent.find().toArray(function (err, results) {
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
