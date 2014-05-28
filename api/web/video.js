var getVideo = function (request, reply){
  var db = request.server.plugins['hapi-mongodb'].db;

  //params:id
  db.collection('videos').findOne().toArray(function(err, results){
    reply(results);
  })
};

module.exports = getVideo;
