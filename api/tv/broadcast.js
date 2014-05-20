var getBroadcast = function (request, reply){
  var db = request.server.plugins['hapi-mongodb'].db;
  db.collection('broadcast').find()(function(err, items) {
    reply(items);
  });
};

module.exports = getBroadcast;
