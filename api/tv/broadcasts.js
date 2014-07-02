var getBroadcasts = function (request, reply){
    var db = request.server.plugins.mongodb.db;

    var res = [];

    db.collection('broadcasts').find().toArray(function(err, results){
      for (var r in results){
        res.push(results[r]);
      }
      db.collection('strikes').find().toArray(function(err, results){
        for (var r in results){
          res.push(results[r]);
        }
        if(!err){
          reply(res);
        }
      });
    });
};

module.exports.handler = getBroadcasts;