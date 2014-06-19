var getSchedule = function (request, reply){
    var db = request.server.plugins.mongodb.db;

    db.collection('schedule').find().toArray(function(err, results){
        reply(results);
    });
};

module.exports.handler = getSchedule;