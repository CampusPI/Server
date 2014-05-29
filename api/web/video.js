var getVideo = function (request, reply){
  var db = request.server.plugins['hapi-mongodb'].db;

  db.collection('videos').find({id: request.params.id}).toArray(function(err, results){
    reply(results);
  });
};

module.exports.handler = getVideo;
