var getBroadcast = function (request, reply){
  var db = request.server.plugins['hapi-mongodb'].db;

  db.collection('broadcasts').find().toArray(function(err, results){
    reply(results);
  });
};

module.exports.handler = getBroadcast;
