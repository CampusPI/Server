var i = 0;


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
      if(i===0){
        currentContent.remove({}, function(){});
      }
        var temp = request.payload;
        temp.count = i;
        currentContent.insert(temp, function(){
          reply({
            error: null,
            success: true
          });
          i++;
          currentContent.remove({count: i-20}, function(){

          })
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
