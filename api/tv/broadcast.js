var getBroadcast = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  db.collection('broadcasts').find().toArray(function(err, results){
    reply(results);
  });
};

module.exports.handler = getBroadcast;
