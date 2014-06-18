var getStuff = function (request, reply){
  var db = request.server.plugins.mongodb.db;
  if (request.params.id) {
    db.collection('videos').find({id: request.params.id}).toArray(function(err, results){
      reply(results[0]);
    });
  }
  else {
    db.collection('videos').find().toArray(function(err, results){
      reply(results);
    });
  }
};

module.exports.handler = getStuff;
module.exports.auth = 'bearer';
