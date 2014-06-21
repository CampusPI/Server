var currentContent = function(request, reply) {
  var db = request.server.plugins.mongodb.db;
  var currentContent = db.collection('currentContent');
  switch (request.method) {
    case 'get':
      currentContent.find().toArray(function (err, results) {
        reply(results);
      });
      break;
    case 'post':
      currentContent.remove({}, function () {
          currentContent.insert(request.payload, function(){
            reply({
              error: null,
              success: true
            });
          });
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

module.exports.handler = currentContent;
