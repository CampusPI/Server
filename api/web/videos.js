var getVideos = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  db.collection('videos').find().toArray(function(err, results){
    reply(results);
  });
};

module.exports.handler = getVideos;
module.exports.auth = 'bearer';
