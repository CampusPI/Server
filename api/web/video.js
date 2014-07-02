var getVideo = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  db.collection('videos').find({id: request.params.id}).toArray(function(err, results){
    reply(results[0]);
  });
};

module.exports.handler = getVideo;
