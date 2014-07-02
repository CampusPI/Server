var getBiblio = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  db.collection('biblio').find().toArray(function(err, results){
    reply(results);
  });
};

module.exports.handler = getBiblio;
