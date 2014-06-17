var getUser = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  db.collection('users').find({id: request.auth.credentials.id}).toArray(function(err, results){
    reply(results[0]);
  });
};

module.exports.handler = getUser;
module.exports.auth = 'bearer';
