var getNews = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  db.collection('news').find().toArray(function(err, results){
    reply(results);
  });
};

module.exports.handler = getNews;
