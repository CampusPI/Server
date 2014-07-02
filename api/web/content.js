var getContent = function (request, reply){
  var db = request.server.plugins.mongodb.db;
  var ob = request.server.plugins.mongodb.ObjectID;
  var x = ob(request.params.id);
  db.collection('videos').findOne({'_id': x},function(err, results){
    console.log(results);
    if (results) {
      reply(results);
    }
    db.collection('biblio').findOne({'_id': x},function(err, result){
      console.log(result);
      if (result) {
        reply(result);
      }
      db.collection('news').findOne({'_id': x},function(err, resul){
        console.log(resul);
        if (resul) {
          reply(resul);
        }
        else {
          reply([]);
        }
      });
    });
  });

};

module.exports.handler = getContent;
