var getStrikes = function (request, reply){
    var db = request.server.plugins.mongodb.db;

    db.collection('strikes').find().toArray(function(err, results){
        reply(results);
    });
};

module.exports.handler = getStrikes;