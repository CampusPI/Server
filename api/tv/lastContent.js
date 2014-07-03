
var lastContent = function(request, reply) {
  var db = request.server.plugins.mongodb.db;
  switch (request.method) {
  case 'get':
    db.collection('lastContent').find().sort({count: 1}).toArray(function(err, results){
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
