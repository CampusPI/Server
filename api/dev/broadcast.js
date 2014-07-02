var setBroadcasts = function (request, reply){
  var db = request.server.plugins.mongodb.db;
  var broadcasts = db.collection('broadcasts');

  broadcasts.remove({}, function(){
    request.payload.forEach(function(entry){
      broadcasts.insert(entry, function() {});
    });
  });

  reply({
    error: null,
    success: true
  });
};

module.exports.handler = setBroadcasts;
