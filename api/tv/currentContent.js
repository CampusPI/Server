var i = 0;

var currentContent = function(request, reply) {
  var db = request.server.plugins.mongodb.db;
  var currentContent = db.collection('currentContent');
  var lastContent = db.collection('lastContent');
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

      if(i===0){
        lastContent.remove({}, function(){});
      }
      var temp = request.payload;
      temp.count = i;
      lastContent.insert(temp, function(){
        reply({
          error: null,
          success: true
        });

        i++;
        lastContent.remove({count: i-20}, function(){})
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
