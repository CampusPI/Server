/*var favorite = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  //params:user_id
  db.collection('favorites').find().toArray(function(err, results){
    reply(results);
  });
};

/*var postFav = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  //params:video_id, user_id
  db.collection('favorites').find().toArray(function(err, results){
    reply(results);
  });
};*/

var favorite = function(request, reply) {
  //var db = request.server.plugins.mongodb.db;
  switch (request.method) {
  case 'get':
    //é um getfavs
    break;
  case 'post':
    //é um add to favs
    break;
  default:
    //erro
    break;
  }

  console.log(request.params.id);

  reply({});
};

module.exports.handler = favorite;
//module.exports.auth = 'bearer';
