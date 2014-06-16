var getWeather = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  db.collection('weather').find().toArray(function(err, items) {
    reply(items[0]);
  });
};

module.exports.handler = getWeather;
module.exports.auth = 'google';
