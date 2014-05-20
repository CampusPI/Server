var getContent = function (request, reply){

    var db = request.server.plugins['hapi-mongodb'].db;

    db.collection('contents').find().toArray(function(err, results){
        reply(results);
    });
};

module.exports = getContent;