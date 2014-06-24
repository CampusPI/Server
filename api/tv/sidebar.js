var getBroadcast = function (request, reply){
  var db = request.server.plugins.mongodb.db;

  var obj = [];

  db.collection('food').find().toArray(function(err, results){
    obj.push({
      name: 'Ementas',
      content: results
    });
    db.collection('transports').find().toArray(function(err, res){
      obj.push({
        name: 'Transportes',
        content: res
      });
      reply(obj);
    });
  });
};

module.exports.handler = getBroadcast;
