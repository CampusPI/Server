var getFav = function (request, reply){
  var db = request.server.plugins['hapi-mongodb'].db;

  //params:user_id
  db.collection('favorites').find().toArray(function(err, results){
    reply(results);
  })
};

var postFav = function (request, reply){
  var db = request.server.plugins['hapi-mongodb'].db;

  //params:video_id, user_id
  db.collection('favorites').find().toArray(function(err, results){
    reply(results);
  })
};

module.exports.get = getFav;
module.exports.post = postFav;
