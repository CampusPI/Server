var getFav = function (request, reply){
  var db = request.server.plugins.mongodb.db;
  var ob = request.server.plugins.mongodb.ObjectID;

  db.collection('users').find({id: request.auth.credentials.id}).toArray(function(err, results){
    var favs = [];
    if(results[0].favs) { favs = results[0].favs.map(function(x) { return ob(x); }); }
    db.collection('videos').find({'_id': { $in: favs}}).toArray(function(err, results){
      reply(results);
    });
  });
};

var postFav = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  db.collection('users').update(
    {id: request.auth.credentials.id},
    {$push: {'favs': request.payload.videoid}},
    function(err, results){
      reply(results);
    }
  );
};

var removeFav = function(request, reply){
  var db = request.server.plugins.mongodb.db;
  var a = JSON.parse(request.payload);
  db.collection('users').update(
    {id: request.auth.credentials.id},
    {$pull: {'favs': a.id}},
    function(err, results){
      reply(results);
    }
  );
};


module.exports.get = {
  handler:getFav,
  auth: 'bearer'
};
module.exports.post = {
  handler:postFav,
  auth: 'bearer'
};
module.exports.delete = {
  handler:removeFav,
  auth: 'bearer'
};
